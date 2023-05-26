import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { apiConfig, apiService } from '@libs/shared/data-access/api-client';

class AuthService {
  private tokenRefresh$?: Observable<string>;

  public refreshToken(): Observable<string> {
    if (!this.tokenRefresh$) {
      this.tokenRefresh$ = apiService.get(apiConfig.refreshTokenEndpoint, {}, { fullResponse: true }).pipe(
        share(),
        map((response) => {
          const authorizationHeader: string | null = response.headers?.authorization;

          return authorizationHeader?.split(' ')?.[1];
        }),
        tap(() => {
          this.tokenRefresh$ = null;
        })
      );
    }

    return this.tokenRefresh$;
  }
}

export const authService = new AuthService();
