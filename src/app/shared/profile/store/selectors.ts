import { AppState } from '@store';
import { createSelector } from 'reselect';
import { ProfileState } from './state';

const selectFeature = (state: AppState): ProfileState => state.user;

export class ProfileSelectors {
  public static profile = createSelector(
    selectFeature,
    (state) => state.profile
  );

  public static isRefreshing = createSelector(
    selectFeature,
    (state) => state.isRefreshing
  );

  public static isUpdating = createSelector(
    selectFeature,
    (state) => state.isUpdating
  );
}
