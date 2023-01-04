import { AxiosError } from 'axios';
import { defineAction } from '@store/utils';
import { AuthCredentials, AuthResponse } from '../models';

export class AuthActions {
  public static authorize = defineAction<AuthCredentials>(
    '[Auth] Authorize'
  );

  public static authorizeSuccess = defineAction<AuthResponse>(
    '[Auth] Authorize Success'
  );

  public static authorizeFailure = defineAction<AxiosError>(
    '[Auth] Authorize Failure'
  );

  public static unauthorize = defineAction<{ keepInterruptedNavigation?: boolean }>(
    '[Auth] Unauthorize'
  );

  public static saveToken = defineAction<{ token: string }>(
    '[Auth] Save token'
  );

  public static tokenLoaded = defineAction(
    '[Auth] Token loaded'
  );

  public static clearToken = defineAction(
    '[Auth] Clear token'
  );
}
