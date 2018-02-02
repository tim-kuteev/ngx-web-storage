# Angular2+ Web Storage

It's a simple library for Angular applications which provides the easy way to store data in web storage.
Inspired by [angular-2-local-storage](https://github.com/phenomnomnominal/angular-2-local-storage).

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
    WebStorageModule.forRoot(),
  ],
  ...
})
export class AppModule {}
```

#### Use service to store data: 

```typescript
import { WebStorageService } from "ngx-web-storage";

...
export class MyComponent implements OnInit {

  constructor(private storage: WebStorageService) {
  }

  ngOnInit(): void {
    this.storage.local.set('GREETING', 'Hello World!');
    ...
    const greeting = this.storage.local.get<string>('GREETING');
  }
}
```

## Advanced

You can use both storage. **session** (get cleared when the page session ends) and **local** (has no expiration time).

```typescript
  this.storage.session.set('FOO', ...); // storing in session storage

  this.storage.local.set('BAR', ...); // storing in local storage
```

#### Methods

| Name              | Parameters                     | Return type       | Description                                 |
| ----------------- | ------------------------------ | ----------------- | ------------------------------------------- |
| set               | key: string, value: any        | boolean           | Setting value                               |
| get\<T\>          | key: string                    | \<T\> or null     | Getting value                               |
| remove            | key: string                    | boolean           | Removing the value from storage             |
| clear             |                                | boolean           | Cleaning up storage                         |

#### Observing

You can subscribe on storage for changing or error handling.

```typescript
  this.storage.local.actions.subscribe(action => {...}); // observing changes on local storage

  this.storage.actions.subscribe(action => {...}); // observing changes on both storage

  this.storage.errors.subscribe(error => {...}); // observing errors on both storage
```

It's easy to subscribe for particular key:

```typescript
import 'rxjs/add/operator/filter';
...

  this.storage.local.actions
    .filter(action => action.key === 'FOO')
    .subscribe(action => {...});
```

## License

MIT
