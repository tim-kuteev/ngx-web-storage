import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebStorageConfig } from './web-storage.config';
import { WebStorageService } from './web-storage.service';

const defaultConfig = <WebStorageConfig>{prefix: 'NG'};

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

  static forRoot(config = defaultConfig): ModuleWithProviders {
    return {
      ngModule: WebStorageModule,
      providers: [
        {provide: WebStorageConfig, useValue: config}
      ]
    };
  }
}
