import { User } from '@shared/user';

export class ProfileState {
  public profile: User;
  public isRefreshing: boolean;
  public isUpdating: boolean;

  constructor() {
    this.profile = null;
  }
}
