import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEB_STORAGE_CONFIG, WebStorageConfig } from './web-storage.config';
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

  static forRoot(config: WebStorageConfig = {prefix: 'NG_'}): ModuleWithProviders {
    return {
      ngModule: WebStorageModule,
      providers: [
        {provide: WEB_STORAGE_CONFIG, useValue: config}
      ]
    };
  }
}
