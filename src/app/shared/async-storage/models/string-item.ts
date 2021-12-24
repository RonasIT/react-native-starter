import { Observable } from 'rxjs';
import { asyncStorageService } from '../service';

export class AsyncStorageStringItem {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  public get(): Observable<string | null> {
    return asyncStorageService.getString(this.key);
  }

  public set(value: string): Observable<void> {
    return asyncStorageService.setString(this.key, value);
  }

  public remove(): Observable<void> {
    return asyncStorageService.remove(this.key);
  }
}
