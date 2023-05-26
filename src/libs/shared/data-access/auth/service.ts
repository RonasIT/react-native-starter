import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { apiService, apiConfig } from '@libs/shared/data-access/api-client';
import { profileService } from '@libs/shared/data-access/profile';
import { AuthCredentials, AuthResponse } from './models';

class AuthService {
  private tokenRefresh$?: Observable<string>;

  // TODO: Demo code. Remove in a real app.
  public demoAuthorize(_: AuthCredentials): Observable<AuthResponse> {
    return profileService.getDemoProfile().pipe(
      map((response) => ({
        user: response,
        token: '1d606297f5cb48a0bd5dff4fb04f4922c7844478e32cfe1ac293a4393bd1887f'
      }))
    );
  }

  public authorize(credentials: AuthCredentials): Observable<AuthResponse> {
    const request = new AuthCredentials(credentials);

    return apiService
      .post('login', instanceToPlain(request))
      .pipe(map((response) => plainToInstance(AuthResponse, response)));
  }

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
