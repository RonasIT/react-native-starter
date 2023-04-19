import { usersListReducer } from '@libs/users/features/list/store/reducer';
import { authReducer } from '../auth/store/reducer';
import { entityStoreReducer } from '../base-entity/store/reducer';
import { profileReducer } from '../profile/store/reducer';

export const rootReducer = {
  auth: authReducer,
  profile: profileReducer,
  entityStore: entityStoreReducer,
  usersList: usersListReducer
};
