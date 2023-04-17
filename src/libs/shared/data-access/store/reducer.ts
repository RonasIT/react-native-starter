import { homeScreenReducer } from '@app/main/home/shared/store/reducer';
import { authReducer } from '../auth/store/reducer';
import { entityStoreReducer } from '../base-entity/store/reducer';
import { profileReducer } from '../profile/store/reducer';

export const rootReducer = {
  auth: authReducer,
  profile: profileReducer,
  entityStore: entityStoreReducer,
  homeScreen: homeScreenReducer
};
