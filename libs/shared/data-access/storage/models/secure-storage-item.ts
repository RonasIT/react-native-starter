import * as SecureStore from 'expo-secure-store';
import { isNil } from 'lodash';
import { StorageItem } from './item';

export class SecureStorageItem implements StorageItem {
  constructor(private key: string) {}

  public async set(value: string | null): Promise<void> {
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
}
