import { authAPI } from '@libs/shared/data-access/api/auth/api';
import { profileAPI } from '@libs/shared/data-access/api/profile/api';
import { userApi } from '@libs/shared/data-access/api/user/api';
import { authReducer } from '../api/auth/store/reducer';

export const rootReducer = {
  auth: authReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
  [userApi.reducerPath]: userApi.reducer
};
