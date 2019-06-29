import { InMemoryStorage } from './in-memory-storage';
import { KeyUtility } from '../web-storage.config';

export class WebStorage {

  private _storage: Storage;

  constructor(
      protected _storageType: 'sessionStorage' | 'localStorage',
  ) {
    if (this._isSupported()) {
      this._storage = window[this._storageType];
    } else {
      this._storage = new InMemoryStorage();
    }
  }

  get(key: string): any {
    const item = this._storage.getItem(KeyUtility.compose(key));
    if (item === null) {
      return null;
    }
    return JSON.parse(item);
  }

  set(key: string, value: any): boolean {
    if (!key) {
      return false;
    }
    typeof value === 'undefined' && (value = null);
    this._storage.setItem(KeyUtility.compose(key), JSON.stringify(value));
    return true;
  }

  remove(key: string): boolean {
    const fullKey = KeyUtility.compose(key);
    if (this._storage.getItem(fullKey) === null) {
      return false;
    }
    this._storage.removeItem(fullKey);
    return true;
  }

  clear(): void {
    for (const key in this._storage) {
      if (KeyUtility.isComposite(key)) {
        this._storage.removeItem(key);
      }
    }
  }

  private _isSupported(): boolean {
    try {
      if (this._storageType in window && window[this._storageType] !== null) {
        const webStorage = window[this._storageType];
        const key = KeyUtility.compose('__DUMMY');
        webStorage.setItem(key, '');
        webStorage.removeItem(key);
        return true;
      }
    } catch (e) {}
    return false;
  }
}
