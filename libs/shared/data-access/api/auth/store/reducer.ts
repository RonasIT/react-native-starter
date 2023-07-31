import { createReducer } from '@reduxjs/toolkit';
import { AuthActions } from './actions';

export interface AuthState {
  token?: string;
  isTokenLoaded: boolean;
}

const initialState: AuthState = {
  isTokenLoaded: false
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(AuthActions.clearToken, (state) => {
      state.token = null;
    })
    .addCase(AuthActions.saveToken, (state, { payload }) => {
      state.token = payload.token;
    })
    .addCase(AuthActions.tokenLoaded, (state) => {
      state.isTokenLoaded = true;
    });
});
