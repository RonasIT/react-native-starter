export interface StorageItem {
  set(value: string): Promise<void>;
  get(): Promise<string | null>;
  remove(): Promise<void>;
}
