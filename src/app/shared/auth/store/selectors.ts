import { AppState } from '@store';
import { AuthState } from './reducer';
import { createSelector } from '@reduxjs/toolkit';

const selectFeature = (state: AppState): AuthState => state.auth;

export class AuthSelectors {
  public static token = createSelector(
    selectFeature,
    (state) => state.token
  );

  public static isAuthenticated = createSelector(
    selectFeature,
    (state) => !!state.token
  );

  public static isTokenLoaded = createSelector(
    selectFeature,
    (state) => state.isTokenLoaded
  );

  public static isAuthorizing = createSelector(
    selectFeature,
    (state) => state.isAuthorizing
  );
}
