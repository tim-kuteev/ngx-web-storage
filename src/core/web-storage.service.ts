import { Inject, Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { WebStorageController } from './storage.controller';
import { WEB_STORAGE_CONFIG, WebStorageConfig } from './web-storage.config';

export interface WebStorageItemAction {
  action: string;
  key: string;
  value?: any;
}

@Injectable()
export class WebStorageService {

  private _session: WebStorageController;
  private _local: WebStorageController;

  constructor(
      @Inject(WEB_STORAGE_CONFIG) private _config: WebStorageConfig,
  ) {
    this._session = new WebStorageController('sessionStorage', this._config.prefix);
    this._local = new WebStorageController('localStorage', this._config.prefix);
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
