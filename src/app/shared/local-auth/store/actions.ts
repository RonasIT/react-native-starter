import { AuthenticationType } from 'expo-local-authentication';
import { defineAction } from '@store/utils';

export class LocalAuthActions {
  public static authenticate = defineAction(
    '[LocalAuth] Authenticate'
  );

  public static setSupportedAuthenticationTypes = defineAction<{ types: Array<AuthenticationType> }>(
    '[LocalAuth] Set Supported Authentication Types'
  );

  public static localAuthSuccess = defineAction(
    '[LocalAuth] Local Auth Success'
  );

  public static setPin = defineAction<{ pin: string }>(
    '[LocalAuth] Set Pin'
  );
}
