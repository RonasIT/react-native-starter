import { createAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthCredentials, AuthResponse } from '../models';

export type unauthorizePayload = { keepInterruptedNavigation?: boolean };

export class AuthActions {
  public static authorize = createAction<AuthCredentials>(
    '[Auth] Authorize'
  );

  public static authorizeSuccess = createAction<AuthResponse>(
    '[Auth] Authorize Success'
  );

  public static authorizeFailure = createAction<AxiosError>(
    '[Auth] Authorize Failure'
  );

  public static unauthorize = createAction<unauthorizePayload>(
    '[Auth] Unauthorize'
  );

  public static saveToken = createAction<{ token: string }>(
    '[Auth] Save token'
  );

  public static tokenLoaded = createAction(
    '[Auth] Token loaded'
  );

  public static clearToken = createAction(
    '[Auth] Clear token'
  );
}
