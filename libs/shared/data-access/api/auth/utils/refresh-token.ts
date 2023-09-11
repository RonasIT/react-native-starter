import AxiosObservable from 'axios-observable';
import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { apiConfig } from '@libs/shared/data-access/api-client';

let tokenRefresh$: Observable<string> | null;

export function refreshToken(httpClient: AxiosObservable): Observable<string> {
  if (!tokenRefresh$) {
    tokenRefresh$ = httpClient.request({ method: 'get', url: `/${apiConfig.refreshTokenEndpoint}` }).pipe(
      share(),
      map((response) => {
        const authorizationHeader = response.headers?.authorization;

        return authorizationHeader?.split(' ')?.[1];
      }),
      tap(() => {
        tokenRefresh$ = null;
      })
    );
  }

  return tokenRefresh$;
}
