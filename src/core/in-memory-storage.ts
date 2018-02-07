/**
 * A dummy storage that is used to store data in memory if local/session storage is not supported to
 * avoid errors. The data stored in InMemoryStorage gets cleared when the page is closed or reloaded.
 * */

export class InMemoryStorage implements Storage {

  private _length = 0;
  private buffer: any = {};

  get length(): number {
    return this._length;
  }

  clear(): void {
    for (const key in this.buffer) {
      this.removeItem(key);
    }
  }

  getItem(key: string): string | any {
    if (this.buffer.hasOwnProperty(key)) {
      return this.buffer[key];
    }
    return null;
  }

  key(index: number): string | any {
    throw new Error('Method unsupported');
  }

  removeItem(key: string): void {
    if (this.buffer.hasOwnProperty(key)) {
      delete this.buffer[key];
      this._length--;
    }
  }

  setItem(key: string, data: string): void {
    if (!this.buffer.hasOwnProperty(key)) {
      this._length++;
    }
    this.buffer[key] = data;
  }

  [key: string]: any;
  [index: number]: string;
}
