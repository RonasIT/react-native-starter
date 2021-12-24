import { AppState } from '@store';
import { createSelector } from 'reselect';
import { LoginScreenState } from './state';

const selectFeature = (state: AppState): LoginScreenState => state.loginScreen;

export class LoginScreenSelectors {
  public static isSubmitting = createSelector(
    selectFeature,
    (state) => state.isSubmitting
  );
}
