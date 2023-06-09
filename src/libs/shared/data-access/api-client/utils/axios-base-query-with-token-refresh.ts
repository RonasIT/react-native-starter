import { AxiosError, HttpStatusCode } from 'axios';
import { lastValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthActions } from '@libs/shared/data-access/api/auth/store/actions';
import { AuthSelectors } from '@libs/shared/data-access/api/auth/store/selectors';
import { checkIsTokenExpired, refreshToken } from '@libs/shared/data-access/api/auth/utils';
import { BaseQueryFunction } from '@libs/shared/data-access/entity-api';
import { AppState } from '@libs/shared/data-access/store';
import { apiConfig } from '../config';
import { axiosBaseQuery } from './axios-base-query';

export const axiosBaseQueryWithTokenRefresh: BaseQueryFunction = async (args, api, extraOptions) => {
  const accessToken = AuthSelectors.token(api.getState() as AppState);
  const isTokenExpired = checkIsTokenExpired(accessToken);
  const shouldRefreshToken = isTokenExpired && !!accessToken && !apiConfig.publicEndpoints.includes(args.url);

  if (shouldRefreshToken && !args.url.includes(apiConfig.refreshTokenEndpoint)) {
    return lastValueFrom(
      refreshToken(api, extraOptions).pipe(
        map(async (token) => {
          api.dispatch(AuthActions.saveToken({ token }));

          return axiosBaseQuery(args, api, extraOptions);
        }),
        catchError((error: AxiosError) => {
          if ([HttpStatusCode.BadRequest, HttpStatusCode.Unauthorized].includes(error.response.status)) {
            api.dispatch(AuthActions.unauthorize({ keepInterruptedNavigation: true }));
          }

          return throwError(() => error);
        })
      )
    );
  }

  return axiosBaseQuery(args, api, extraOptions);
};
