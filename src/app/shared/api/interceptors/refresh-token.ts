import { appConfig } from '@app/constants';
import { authService } from '@shared/auth/service';
import { AuthActions, AuthSelectors } from '@shared/auth/store';
import { checkIsTokenExpired } from '@shared/auth/utils';
import { store } from '@store';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { lastValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponseStatus } from '../enums';

export const refreshTokenInterceptor = (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const state = store.getState();
  const accessToken = AuthSelectors.token(state);
  const isTokenExpired = checkIsTokenExpired(accessToken);
  const shouldRefreshToken = isTokenExpired && !!accessToken;

  if (shouldRefreshToken && !config.url.includes(appConfig.api.refreshTokenEndpoint)) {
    return lastValueFrom(
      authService.refreshToken().pipe(
        map((token) => {
          store.dispatch(AuthActions.saveToken({ token }));
          config.headers.Authorization = `Bearer ${token}`;

          return config;
        }),
        catchError((error: AxiosError) => {
          if ([ApiResponseStatus.BAD_REQUEST, ApiResponseStatus.UNAUTHORIZED].includes(error?.response?.status)) {
            store.dispatch(AuthActions.unauthorize({ keepInterruptedNavigation: true }));
          }

          return throwError(() => error);
        })
      )
    );
  }

  return Promise.resolve(config);
};
