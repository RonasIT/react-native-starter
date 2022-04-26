import { User } from '@shared/user';

export interface ProfileState {
  profile: User;
  isRefreshing: boolean;
  isUpdating: boolean;
}
