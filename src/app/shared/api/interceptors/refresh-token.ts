import { appConfig } from '@app/constants';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponseStatus } from '../enums';

export const refreshTokenInterceptor =
  (options: {
    onSuccess: (token: string) => void;
    onError: (error?: AxiosError) => void;
    refreshToken: () => Observable<string>;
    checkIsTokenExpired: (token: string) => boolean;
    getToken: () => string;
  }) => (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const accessToken = options.getToken();
    const isTokenExpired = options.checkIsTokenExpired(accessToken);
    const shouldRefreshToken = isTokenExpired && !!accessToken && !appConfig.api.publicEndpoints.includes(config.url);

    if (shouldRefreshToken && !config.url.includes(appConfig.api.refreshTokenEndpoint)) {
      return lastValueFrom(
        options.refreshToken().pipe(
          map((token) => {
            options.onSuccess(token);
            config.headers.Authorization = `Bearer ${token}`;

            return config;
          }),
          catchError((error: AxiosError) => {
            if ([ApiResponseStatus.BAD_REQUEST, ApiResponseStatus.UNAUTHORIZED].includes(error?.response?.status)) {
              options.onError(error);
            }

            return throwError(() => error);
          })
        )
      );
    }

    return Promise.resolve(config);
  };
