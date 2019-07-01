import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { WebStorageController } from './web-storage.controller';

export interface WebStorageItemAction {
  type: 'sessionStorage' | 'localStorage',
  action: 'set' | 'remove';
  key: string;
  value?: any;
}

@Injectable()
export class WebStorageService {

  private _session: WebStorageController;
  private _local: WebStorageController;

  constructor() {
    this._session = new WebStorageController('sessionStorage');
    this._local = new WebStorageController('localStorage');
  }

  get session(): WebStorageController {
    return this._session;
  }

  get local(): WebStorageController {
    return this._local;
  }

  get actions(): Observable<WebStorageItemAction> {
    return merge(this._session.actions, this._local.actions);
  }

  get errors(): Observable<any> {
    return merge(this._session.errors, this._local.errors);
  }
}
