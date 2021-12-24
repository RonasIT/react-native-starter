import { Observable } from 'rxjs';
import { asyncStorageService } from '../service';

export class AsyncStorageObjectItem<T extends object> {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  public get(): Observable<T> {
    return asyncStorageService.getObject<T>(this.key);
  }

  public set(value: T): Observable<void> {
    return asyncStorageService.setObject(this.key, value);
  }

  public remove(): Observable<void> {
    return asyncStorageService.remove(this.key);
  }
}
