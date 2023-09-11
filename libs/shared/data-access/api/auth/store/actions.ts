import { defineAction } from '@libs/shared/data-access/store/utils';

export class AuthActions {
  public static unauthorize = defineAction<{ keepInterruptedNavigation?: boolean }>(
    '[Auth] Unauthorize'
  );

  public static saveToken = defineAction<{ token: string | null }>(
    '[Auth] Save token'
  );

  public static tokenLoaded = defineAction(
    '[Auth] Token loaded'
  );

  public static clearToken = defineAction(
    '[Auth] Clear token'
  );
}
