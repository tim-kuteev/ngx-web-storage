import { InMemoryStorage } from './in-memory-storage';

export class WebStorage {

  private _storage: Storage;

  constructor(
      protected _storageType: 'sessionStorage' | 'localStorage',
      protected _prefix,
  ) {
    if (this._isSupported()) {
      this._storage = window[this._storageType];
    } else {
      this._storage = new InMemoryStorage();
    }
  }

  get(key: string): any {
    const item = this._storage.getItem(this._deriveKey(key));
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
    this._storage.setItem(this._deriveKey(key), JSON.stringify(value));
    return true;
  }

  remove(key: string): boolean {
    const fullKey = this._deriveKey(key);
    if (this._storage.getItem(fullKey) === null) {
      return false;
    }
    this._storage.removeItem(fullKey);
    return true;
  }

  clear(): void {
    for (const key in this._storage) {
      if (key.startsWith(this._prefix)) {
        this.remove(key.substring(this._prefix.length));
      }
    }
  }

  private _isSupported(): boolean {
    try {
      if (this._storageType in window && window[this._storageType] !== null) {
        const webStorage = window[this._storageType];
        const key = this._deriveKey('__DUMMY');
        webStorage.setItem(key, '');
        webStorage.removeItem(key);
        return true;
      }
    } catch (e) {}
    return false;
  }

  private _deriveKey(key: string): string {
    return `${this._prefix}${key}`;
  }
}
