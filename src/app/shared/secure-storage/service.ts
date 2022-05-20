import { SecureStorageItem } from './models';

class SecureStorageService {
  public token = new SecureStorageItem('token');
}

export const secureStorageService = new SecureStorageService();
