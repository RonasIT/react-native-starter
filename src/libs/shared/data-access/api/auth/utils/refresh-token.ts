import { SerializedError } from '@reduxjs/toolkit';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { BaseQueryApi } from '@reduxjs/toolkit/query';
import { AxiosError, AxiosResponse } from 'axios';
import { from, Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { apiConfig } from '../../../api-client/config';
import { axiosBaseQuery } from '../../../api-client/utils/axios-base-query';

let tokenRefresh$: Observable<string> = null;

export const refreshToken = (api: BaseQueryApi, extraOptions = {}): Observable<string> => {
  if (!tokenRefresh$) {
    tokenRefresh$ = from(
      axiosBaseQuery({ method: 'get', url: `/${apiConfig.refreshTokenEndpoint}` }, api, extraOptions) as Promise<
        QueryReturnValue<unknown, SerializedError & Partial<AxiosError>, AxiosResponse>
      >
    ).pipe(
      share(),
      map((response) => {
        const authorizationHeader: string | null = response.meta.headers.authorization;

        return authorizationHeader?.split(' ')[1];
      }),
      tap(() => {
        tokenRefresh$ = null;
      })
    );
  }

  return tokenRefresh$;
};
