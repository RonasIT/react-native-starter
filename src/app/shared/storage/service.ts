import { AsyncStorageItem } from './models';

class AppStorageService {
  public token = new AsyncStorageItem('token');
}

export const appStorageService = new AppStorageService();
