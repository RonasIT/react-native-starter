import { AuthActions } from '@shared/auth/store/actions';
import { createReducer } from 'deox';
import { LoginScreenActions } from './actions';
import { LoginScreenState } from './state';

const initialState = new LoginScreenState();

export const loginScreenReducer = createReducer(initialState, (handleAction) => [
  handleAction(LoginScreenActions.resetState, () => initialState),
  handleAction(AuthActions.authorize, (state) => ({
    ...state,
    isSubmitting: true
  })),
  handleAction([AuthActions.authorizeSuccess, AuthActions.authorizeFailure], (state) => ({
    ...state,
    isSubmitting: false
  }))
]);
