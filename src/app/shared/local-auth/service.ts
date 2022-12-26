import * as LocalAuthentication from 'expo-local-authentication';
import { from, Observable } from 'rxjs';
import { appStorageService } from '@shared/storage';

class LocalAuthService {
  public checkSupportedAuthentication(): Observable<Array<LocalAuthentication.AuthenticationType>> {
    return from(LocalAuthentication.supportedAuthenticationTypesAsync());
  }

  public authenticate(): Observable<LocalAuthentication.LocalAuthenticationResult> {
    return from(
      LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        cancelLabel: 'Cancel',
        disableDeviceFallback: true
      })
    );
  }

  public async checkPin(value: string): Promise<boolean> {
    const pinCode = await appStorageService.pin.get();

    return pinCode === value;
  }
}

export const localAuthService = new LocalAuthService();
