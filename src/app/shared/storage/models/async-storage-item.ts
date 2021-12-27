import AsyncStorage from '@react-native-async-storage/async-storage';
import { isNil } from 'lodash';

export class AsyncStorageItem {
  public async set(value: string): Promise<void> {
    if (isNil(value)) {
      this.remove();
    } else {
      await AsyncStorage.setItem(this.key, value);
    }
  }

  public get(): Promise<string | null> {
    return AsyncStorage.getItem(this.key);
  }

  public remove(): void {
    AsyncStorage.removeItem(this.key);
  }

  constructor(private key: string) {}
}
