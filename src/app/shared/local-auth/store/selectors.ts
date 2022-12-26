import { createSelector } from '@reduxjs/toolkit';
import { AuthenticationType } from 'expo-local-authentication';
import { AppState } from '@store';
import { LocalAuthState } from './reducer';

const selectFeature = (state: AppState): LocalAuthState => state.localAuth;

export class LocalAuthSelectors {
  public static isLocalAuthenticated = createSelector(
    selectFeature,
    (state) => state.isLocalAuthenticated
  );

  public static supportedAuthenticationTypes = createSelector(
    selectFeature,
    (state) => state.supportedAuthenticationTypes
  );

  public static isFingerprintSupported = createSelector(
    selectFeature,
    (state) => state.supportedAuthenticationTypes.includes(AuthenticationType.FINGERPRINT)
  );

  public static isFacialRecognitionSupported = createSelector(
    selectFeature,
    (state) => state.supportedAuthenticationTypes.includes(AuthenticationType.FACIAL_RECOGNITION)
  );
}
