import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageItem {
  public set(value: string): Promise<void> {
    return AsyncStorage.setItem(this.key, value);
  }

  public get(): Promise<string | null> {
    return AsyncStorage.getItem(this.key);
  }

  public remove(): void {
    AsyncStorage.removeItem(this.key);
  }

  constructor(private key: string) {}
}
