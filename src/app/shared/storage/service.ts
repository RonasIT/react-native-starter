import { SecureStorageItem } from './models';

class AppStorageService {
  public token = new SecureStorageItem('token');
  public pin = new SecureStorageItem('pin');
}

export const appStorageService = new AppStorageService();
