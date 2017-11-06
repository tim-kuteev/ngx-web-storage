import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { StorageController } from './storage.controller';
import { InMemoryStorage } from './in-memory-storage';
import { WebStorageConfig } from './web-storage.config';
import { WebStorageItemAction, WebStorageServiceError } from './interface';
import 'rxjs/add/observable/merge';

class Errors {
  public static readonly SESSION_UNSUPPORTED = <WebStorageServiceError>{
    code: 1,
    message: 'Session storage unsupported, the storage is running in memory'
  };
  public static readonly LOCAL_UNSUPPORTED = <WebStorageServiceError>{
    code: 2,
    message: 'Local storage unsupported, the storage is running in memory'
  };
  public static readonly LOCAL_UNSUPPORTED_SESSION = <WebStorageServiceError>{
    code: 3,
    message: 'Local storage unsupported, session storage is set as local'
  };
}

@Injectable()
export class WebStorageService {

  session: StorageController;
  local: StorageController;
  actions: Subject<WebStorageItemAction> = new Subject<WebStorageItemAction>();
  errors: Subject<WebStorageServiceError> = new Subject<WebStorageServiceError>();
  private _supported: boolean;
  private prefix: string;

  constructor(config: WebStorageConfig) {
    this.prefix = `${config.prefix}_`;
    this.setup();
  }

  get supported(): boolean {
    return this._supported;
  }

  private setup() {
    if (this.checkStorage('sessionStorage')) {
      this._supported = true;
      this.session = new StorageController(window.sessionStorage, this.prefix);
    } else {
      this._supported = false;
      this.session = new StorageController(new InMemoryStorage());
      this.errors.next(Errors.SESSION_UNSUPPORTED);
    }
    if (this.checkStorage('localStorage')) {
      this.local = new StorageController(window.localStorage, this.prefix);
    } else if (this._supported) {
      this.local = new StorageController(window.sessionStorage, `${this.prefix}LOCAL_`);
      this.errors.next(Errors.LOCAL_UNSUPPORTED_SESSION);
    } else {
      this.local = new StorageController(new InMemoryStorage());
      this.errors.next(Errors.LOCAL_UNSUPPORTED);
    }

    Observable.merge(this.session.errors, this.local.errors)
        .subscribe(err => this.errors.next(err));
    Observable.merge(this.session.actions, this.local.actions)
        .subscribe(change => this.actions.next(change));
  }

  private checkStorage(storageType: 'sessionStorage' | 'localStorage'): boolean {
    try {
      if (storageType in window && window[storageType] !== null) {
        const webStorage = window[storageType];
        const key = `${this.prefix}__DUMMY`;
        webStorage.setItem(key, '');
        webStorage.removeItem(key);
        return true;
      }
    } catch (e) {
      this.errors.next({code: 500, message: e.message});
    }
    return false;
  }
}
