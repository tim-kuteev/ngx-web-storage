import { Observable, Subject } from 'rxjs';
import { WebStorageItemAction } from './web-storage.service';
import { WebStorage } from './web-storage';

export class WebStorageController extends WebStorage {

  private _actions: Subject<WebStorageItemAction> = new Subject<WebStorageItemAction>();
  private _errors: Subject<any> = new Subject<any>();

  constructor(
      storageType: 'sessionStorage' | 'localStorage',
      prefix = '',
  ) {
    super(storageType, prefix);
  }

  get actions(): Observable<WebStorageItemAction> {
    return this._actions.asObservable();
  }

  get errors(): Observable<any> {
    return this._errors.asObservable();
  }

  get(key: string): any {
    try {
      return super.get(key);
    } catch (e) {
      this._errors.next(e);
      return null;
    }
  }

  set(key: string, value: any): boolean {
    try {
      const success = super.set(key, value);
      if (success) {
        this._actions.next({
          action: 'set',
          key: key,
          value: value,
        });
      }
    } catch (e) {
      this._errors.next(e);
      return false;
    }
    return true;
  }

  remove(key: string): boolean {
    try {
      const success = super.remove(key);
      if (success) {
        this._actions.next({
          action: 'remove',
          key: key,
        });
      }
    } catch (e) {
      this._errors.next(e);
      return false;
    }
    return true;
  }

  clear(): void {
    try {
      super.clear();
    } catch (e) {
      this._errors.next(e);
    }
  }
}
