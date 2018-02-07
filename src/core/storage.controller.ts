import { Subject } from 'rxjs/Subject';
import { WebStorageItemAction, WebStorageServiceError } from './interface';

export class StorageController {

  actions: Subject<WebStorageItemAction> = new Subject<WebStorageItemAction>();
  errors: Subject<WebStorageServiceError> = new Subject<WebStorageServiceError>();

  constructor(
      private storage: Storage,
      private prefix = '') {
  }

  get<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(this.deriveKey(key));
      return JSON.parse(item as string);
    } catch (e) {
      return null;
    }
  }

  set(key: string, value: any): boolean {
    if (!key) {
      return false;
    }
    try {
      this.storage.setItem(this.deriveKey(key), JSON.stringify(value));
      this.notifyAction('set', key, value);
    } catch (e) {
      this.errors.next({code: 500, message: e.message});
      return false;
    }
    return true;
  }

  remove(key: string): boolean {
    try {
      const fullKey = this.deriveKey(key);
      if (!this.storage.getItem(fullKey) != null) {
        return false;
      }
      this.storage.removeItem(fullKey);
      this.notifyAction('remove', key);
    } catch (e) {
      this.errors.next({code: 500, message: e.message});
      return false;
    }
    return true;
  }

  clear(): boolean {
    for (const key in this.storage) {
      if (key.indexOf(this.prefix) === 0 && !this.remove(key.substr(this.prefix.length))) {
        return false;
      }
    }
    return true;
  }

  private deriveKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  private notifyAction(action: string, key: string, value?: any) {
    this.actions.next({
      action: action,
      key: key,
      value: value,
    });
  }
}
