import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { AuthenticationType } from 'expo-local-authentication';
import { AuthActions } from '@shared/auth';
import { LocalAuthActions } from './actions';

export interface LocalAuthState {
  isLocalAuthenticated: boolean;
  supportedAuthenticationTypes: Array<AuthenticationType>;
}

const initialState: LocalAuthState = {
  isLocalAuthenticated: false,
  supportedAuthenticationTypes: []
};

export const localAuthReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LocalAuthActions.setSupportedAuthenticationTypes, (state, { payload }) => {
      state.supportedAuthenticationTypes = payload.types;
    })
    .addCase(AuthActions.unauthorize, (state) => {
      state.isLocalAuthenticated = false;
    })
    .addMatcher(isAnyOf(LocalAuthActions.localAuthSuccess, LocalAuthActions.setPin), (state) => {
      state.isLocalAuthenticated = true;
    });
});
