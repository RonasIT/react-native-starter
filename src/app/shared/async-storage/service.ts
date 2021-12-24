import AsyncStorage from '@react-native-async-storage/async-storage';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class AsyncStorageService {
  public getString(key: string): Observable<string | null> {
    return this.getItem(key);
  }

  public setString(key: string, value: string): Observable<void> {
    return this.setItem(key, value);
  }

  public getObject<T extends object>(key: string): Observable<T> {
    return this.getItem(key).pipe(
      map((value) => {
        try {
          return JSON.parse(value) as T;
        } catch (error) {
          console.error('AsyncStorageService: Failed to parse JSON value');

          return null;
        }
      })
    );
  }

  public setObject<T extends object>(key: string, value: T): Observable<void> {
    try {
      return this.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('AsyncStorageService: Failed to stringify value to JSON');

      return null;
    }
  }

  public remove(key: string): Observable<void> {
    return this.removeItem(key);
  }

  private getItem(key: string): Observable<string | null> {
    return from(AsyncStorage.getItem(key));
  }

  private setItem(key: string, value: string): Observable<void> {
    return [null, undefined].includes(value) ? this.removeItem(key) : from(AsyncStorage.setItem(key, value));
  }

  private removeItem(key: string): Observable<void> {
    return from(AsyncStorage.removeItem(key));
  }
}

export const asyncStorageService = new AsyncStorageService();
