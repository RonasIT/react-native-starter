import { homeScreenReducer } from '@app/main/home/shared/store/reducer';
import { authReducer } from '@shared/auth/store/reducer';
import { entityStoreReducer } from '@shared/base-entity/store/reducer';
import { profileReducer } from '@shared/profile/store/reducer';

export const rootReducer = {
  auth: authReducer,
  profile: profileReducer,
  entityStore: entityStoreReducer,
  homeScreen: homeScreenReducer
};
