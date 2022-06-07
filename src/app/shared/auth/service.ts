import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { appConfig } from '@app/constants';
import { apiService } from '@shared/api/service';
import { profileService } from '@shared/profile';
import { AuthCredentials, AuthResponse } from './models';

class AuthService {
  private tokenRefresh$?: Observable<string>;

  // TODO: Demo code. Remove in a real app.
  public demoAuthorize(_: AuthCredentials): Observable<AuthResponse> {
    return profileService.getDemoProfile().pipe(
      map((response) => ({
        user: response,
        token: 'some-demo-token'
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
      this.tokenRefresh$ = apiService.get(appConfig.api.refreshTokenEndpoint, {}, { fullResponse: true }).pipe(
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
