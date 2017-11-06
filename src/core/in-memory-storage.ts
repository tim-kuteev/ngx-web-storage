/**
 * A dummy storage that is used to store data in memory if local/session storage is not supported to
 * avoid errors. The data stored in InMemoryStorage gets cleared when the page is closed or reloaded.
 * */
import { AssertionError } from 'assert';

export class InMemoryStorage implements Storage {

  length = 0;
  private buffer: any = {};

  clear(): void {
    this.buffer = {};
  }

  getItem(key: string): string | any {
    return this.buffer[key];
  }

  key(index: number): string | any {
    throw new AssertionError({message: 'Method unsupported'});
  }

  removeItem(key: string): void {
    if (this.buffer[key]) {
      delete this.buffer[key];
      this.length--;
    }
  }

  setItem(key: string, data: string): void {
    if (!this.buffer[key]) {
      this.length++;
    }
    this.buffer[key] = data;
  }

  [key: string]: any;
  [index: number]: string;
}
