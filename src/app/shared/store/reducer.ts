import { combineReducers } from 'redux';
import { profileReducer } from '@shared/profile/store/reducer';
import { authReducer } from '@shared/auth/store/reducer';
import { appNavigationReducer } from '@shared/navigation/store/reducer';
import { loginScreenReducer } from '@app/public/login/shared/store/reducer';
import { entityStoreReducer } from '@shared/base-entity/store/reducer';

export const rootReducer = combineReducers({
  user: profileReducer,
  auth: authReducer,
  navigation: appNavigationReducer,
  loginScreen: loginScreenReducer,
  entityStore: entityStoreReducer
});
