import { AppState } from '@store';
import { createSelector } from '@reduxjs/toolkit';
import { ProfileState } from './state';
import { plainToInstance } from 'class-transformer';
import { User } from '@shared/user';

const selectFeature = (state: AppState): ProfileState => state.profile;

export class ProfileSelectors {
  public static profile = createSelector(
    selectFeature,
    (state) => plainToInstance(
      User,
      state.profile
    )
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
