import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { ProfileState } from './reducer';

const selectFeature = (state: AppState): ProfileState => state.profile;

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
