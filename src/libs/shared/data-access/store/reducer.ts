import { userApi } from '@libs/shared/data-access/api/user/api';
import { authReducer } from '../auth/store/reducer';
import { profileReducer } from '../profile/store/reducer';

export const rootReducer = {
  auth: authReducer,
  profile: profileReducer,
  [userApi.reducerPath]: userApi.reducer
};
