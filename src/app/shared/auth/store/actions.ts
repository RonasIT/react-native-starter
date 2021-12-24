import { action, actionWithPayload } from '@store/action-factory';
import { AxiosError } from 'axios';
import { AuthCredentials, AuthResponse } from '../models';

export class AuthActions {
  public static authorize = actionWithPayload<AuthCredentials>(
    '[Auth] Authorize'
  );

  public static authorizeSuccess = actionWithPayload<AuthResponse>(
    '[Auth] Authorize Success'
  );

  public static authorizeFailure = actionWithPayload<AxiosError>(
    '[Auth] Authorize Failure'
  );

  public static unauthorize = actionWithPayload<{ keepInterruptedNavigation?: boolean }>(
    '[Auth] Unauthorize'
  );

  public static saveToken = actionWithPayload<{ token: string }>(
    '[Auth] Save token'
  );

  public static tokenLoaded = action(
    '[Auth] Token loaded'
  );

  public static clearToken = action(
    '[Auth] Clear token'
  );
}
