import { AsyncStorageStringItem } from '../async-storage/models';

class AppStorageService {
  public token: AsyncStorageStringItem;

  constructor() {
    this.token = new AsyncStorageStringItem('token');
  }
}

export const appStorageService = new AppStorageService();
