import { appConfig } from '@app/constants';
import { apiService } from '@shared/api/service';
import { classToPlain, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { AuthCredentials, AuthResponse } from './models';

class AuthService {
  private tokenRefresh$?: Observable<string>;

  public authorize(credentials: AuthCredentials): Observable<AuthResponse> {
    const request = new AuthCredentials(credentials);

    return apiService
      .post('login', classToPlain(request))
      .pipe(map((response) => plainToClass(AuthResponse, response)));
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
