# Angular2+ Web Storage

Web storage for Angular applications. Inspired by [angular-2-local-storage](https://github.com/phenomnomnominal/angular-2-local-storage).

Full instruction is coming soon.

## Install
```bash
npm i ngx-web-storage --save
```

## Simple usage

Import module:
```typescript
import { WebStorageModule } from "ngx-web-storage";

@NgModule({
  ...
  imports: [
    ...
    WebStorageModule.forRoot(),
  ],
  ...
})
export class AppModule {}
```

Use service to send toast: 
```typescript
import { WebStorageService } from "ngx-web-storage";

...
export class MyComponent implements OnInit {

  constructor(
      private storage: WebStorageService) {
  }

  ngOnInit(): void {
    this.storage.session.set('LOREM', 'The quick brown fox jumps over the lazy dog'); // storing in session storage

    this.storage.local.set('IPSUM', 'Pack my box with five dozen liquor jugs'); // storing in local storage

    const ipsum = this.storage.local.get<string>('IPSUM'); // getting value from storage

    this.storage.local.remove('IPSUM'); // erasing value from storage

    this.storage.local.clear(); // clearing up storage
  }
}
```

###### Full instruction is coming soon.
