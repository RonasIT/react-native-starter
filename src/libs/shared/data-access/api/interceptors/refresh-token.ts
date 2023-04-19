import { AxiosError, AxiosRequestConfig, HttpStatusCode } from 'axios';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiConfig } from '../config';

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
    const shouldRefreshToken = isTokenExpired && !!accessToken && !apiConfig.publicEndpoints.includes(config.url);

    if (shouldRefreshToken && !config.url.includes(apiConfig.refreshTokenEndpoint)) {
      return lastValueFrom(
        options.refreshToken().pipe(
          map((token) => {
            options.onSuccess(token);
            config.headers.Authorization = `Bearer ${token}`;

            return config;
          }),
          catchError((error: AxiosError) => {
            if ([HttpStatusCode.BadRequest, HttpStatusCode.Unauthorized].includes(error?.response?.status)) {
              options.onError(error);
            }

            return throwError(() => error);
          })
        )
      );
    }

    return Promise.resolve(config);
  };
