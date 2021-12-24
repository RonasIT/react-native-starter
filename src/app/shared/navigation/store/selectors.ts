import { AppState } from '@store';
import { createSelector } from 'reselect';
import { AppNavigationState } from './state';

const selectFeature = (state: AppState): AppNavigationState => state.navigation;

export class AppNavigationSelectors {
  public static interruptedNavigation = createSelector(
    selectFeature,
    (state) => state.interruptedNavigation
  );
}
