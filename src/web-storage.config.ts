export const WEB_STORAGE_DEFAULT_CONFIG: WebStorageConfig = {prefix: 'NG_'};

export interface WebStorageConfig {
  prefix: string;
}

// @dynamic
export class ConfigManager {

  private static _config = WEB_STORAGE_DEFAULT_CONFIG;

  static get prefix(): string {
    return this._config.prefix;
  }

  static set(value?: WebStorageConfig) {
    if (value) {
      this._config = value;
    }
  }
}

export class KeyUtility {

  static compose(key: string): string {
    return `${ConfigManager.prefix}${key}`;
  }

  static isComposite(key: string): boolean {
    return key.startsWith(ConfigManager.prefix);
  }
}
