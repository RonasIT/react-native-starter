import { AxiosError, AxiosRequestConfig, HttpStatusCode } from 'axios';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiConfig } from '../config';

export const refreshTokenInterceptor =
  (options: {
    onSuccess: (token: string) => void;
    onError: (error?: AxiosError) => void;
    refreshToken: () => Observable<string>;
    checkIsTokenExpired: (token: string | null) => boolean;
    getToken: () => string | null;
  }) => (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const accessToken = options.getToken();
    const isTokenExpired = options.checkIsTokenExpired(accessToken);
    const shouldRefreshToken =
      isTokenExpired && !!accessToken && !apiConfig.publicEndpoints.includes(config.url as string);

    if (shouldRefreshToken && !config.url?.includes(apiConfig.refreshTokenEndpoint)) {
      return lastValueFrom(
        options.refreshToken().pipe(
          map((token) => {
            options.onSuccess(token);
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${token}`
            };

            return config;
          }),
          catchError((error: AxiosError) => {
            if (
              [HttpStatusCode.BadRequest, HttpStatusCode.Unauthorized].includes(
                error?.response?.status as HttpStatusCode
              )
            ) {
              options.onError(error);
            }

            return throwError(() => error);
          })
        )
      );
    }

    return Promise.resolve(config);
  };
