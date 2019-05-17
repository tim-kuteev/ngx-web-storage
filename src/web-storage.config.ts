import { InjectionToken } from '@angular/core';

export const WEB_STORAGE_CONFIG = new InjectionToken<WebStorageConfig>('WebStorageConfig');

export interface WebStorageConfig {
  prefix: string;
}
