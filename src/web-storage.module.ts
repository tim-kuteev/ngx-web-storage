import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebStorageConfig, ConfigManager } from './web-storage.config';
import { WebStorageService } from './core/web-storage.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    WebStorageService,
  ]
})
export class WebStorageModule {

  constructor(@Optional() @SkipSelf() parentModule: WebStorageModule) {
    if (parentModule) {
      throw new Error('StorageModule is already loaded. Import it in the root module only');
    }
  }

  static forRoot(config?: WebStorageConfig): ModuleWithProviders {
    ConfigManager.set(config);
    return {
      ngModule: WebStorageModule,
    };
  }
}
