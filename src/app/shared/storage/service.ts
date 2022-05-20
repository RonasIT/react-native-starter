import { SecureStorageItem } from './models';

class AppStorageService {
  public token = new SecureStorageItem('token');
}

export const appStorageService = new AppStorageService();
