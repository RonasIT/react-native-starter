import * as SecureStore from 'expo-secure-store';
import { isNil } from 'lodash';

export class SecureStorageItem {
  public async set(value: string): Promise<void> {
    if (isNil(value)) {
      await this.remove();
    } else {
      await SecureStore.setItemAsync(this.key, value);
    }
  }

  public get(): Promise<string | null> {
    return SecureStore.getItemAsync(this.key);
  }

  public async remove(): Promise<void> {
    await SecureStore.deleteItemAsync(this.key);
  }

  constructor(private key: string) {}
}
