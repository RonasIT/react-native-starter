import { homeScreenReducer } from '@app/main/home/shared/store/reducer';
import { authReducer } from '@shared/auth/store/reducer';
import { entityStoreReducer } from '@shared/base-entity/store/reducer';
import { appNavigationReducer } from '@shared/navigation/store/reducer';
import { profileReducer } from '@shared/profile/store/reducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: profileReducer,
  auth: authReducer,
  navigation: appNavigationReducer,
  entityStore: entityStoreReducer,
  homeScreen: homeScreenReducer
});
