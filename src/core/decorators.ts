import { WebStorage } from './web-storage';

const storageContainer = {};

function getStorage(type: 'sessionStorage' | 'localStorage'): WebStorage {
  if (!storageContainer[type]) {
    storageContainer[type] = new WebStorage(type);
  }
  return storageContainer[type];
}

function webStorageDecorator(type: 'sessionStorage' | 'localStorage', key?: string): Function {
  return (target: any, propertyName: string): void => {
    const storingKey = key || propertyName;
    const webStorage = getStorage(type);
    Object.defineProperty(target, propertyName, {
      get: () => {
        return webStorage.get(storingKey);
      },
      set: (value: any) => {
        webStorage.set(storingKey, value);
      },
    });
  };
}

export function SessionStorage(key?: string) {
  return webStorageDecorator('sessionStorage', key);
}

export function LocalStorage(key?: string) {
  return webStorageDecorator('localStorage', key);
}
