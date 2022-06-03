import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '@store';
import { HomeScreenState } from './reducer';

const selectFeature = (state: AppState): HomeScreenState => state.homeScreen;

export class HomeScreenSelectors {
  public static itemIDs = createSelector(
    selectFeature,
    (state) => state.itemIDs
  );

  public static pagination = createSelector(
    selectFeature,
    (state) => state.pagination
  );

  public static hasNextPage = createSelector(
    selectFeature,
    (state) => state.pagination.currentPage !== state.pagination.lastPage
  );
}
