import { AuthActions } from '@shared/auth/store/actions';
import { store } from '@store/store';
import { appConfig } from '@app/constants';
import { ApiResponseStatus } from '../enums';

export const unauthorizedInterceptor = (error: any): Promise<never> => {
  const { unauthorizedEndpoints } = appConfig.api;

  if (
    error.response?.status === ApiResponseStatus.UNAUTHORIZED &&
    !unauthorizedEndpoints.includes(error.response.config.url)
  ) {
    store.dispatch(AuthActions.unauthorize({ keepInterruptedNavigation: true }));
  }

  return Promise.reject(error);
};
