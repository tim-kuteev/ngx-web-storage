# Angular Web Storage

This is a simple library for Angular applications that provides an easy way to use web storage.

## Install

```bash
npm i ngx-web-storage --save
```

## Simple usage

#### Import module:

```typescript
import { WebStorageModule } from "ngx-web-storage";

@NgModule({
  ...
  imports: [
    ...
    WebStorageModule.forRoot({prefix: 'MY_PREFIX:'}),
  ],
  ...
})
export class AppModule {}
```

#### Use service:

Inject WebStorageService to directly manage session or local storage.

```typescript
import { WebStorageService } from "ngx-web-storage";

...
export class MyComponent implements OnInit {

  constructor(private storage: WebStorageService) {
  }

  ngOnInit(): void {
    this.storage.local.set('GREETING', 'Hello World!'); // storing in local storage
    this.storage.session.set('FOO', ...); // storing in session storage
    ...
    const greeting = this.storage.local.get('GREETING');
  }
}
```
*Methods:*

| Name              | Parameters                     | Description                                 |
| ----------------- | ------------------------------ | ------------------------------------------- |
| set               | key: string, value: any        | Setting value                               |
| get               | key: string                    | Getting value                               |
| remove            | key: string                    | Removing the value from storage             |
| clear             |                                | Cleaning up storage                         |

#### Use decorators: 

LocalStorage and SessionStorage decorators are available to synchronize properties on the go.

```typescript
import { LocalStorage } from "ngx-web-storage";

...
export class MyComponent implements OnInit {

  @LocalStorage('MY_KEY') myProp: string;

  ngOnInit(): void {
    this.myProp = 'Hi!';
  }
}
```

## Demo

**[Try interactive demo on stackblitz](https://stackblitz.com/edit/ngx-web-storage?embed=1&file=app/app.component.ts)**

## License

MIT
