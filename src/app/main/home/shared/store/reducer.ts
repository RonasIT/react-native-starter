import { createReducer } from '@reduxjs/toolkit';
import { Pagination } from '@shared/pagination';
import { HomeScreenActions } from './actions';

export interface HomeScreenState {
  itemIDs: Array<number>;
  pagination: Pagination;
}

const initialState: HomeScreenState = {
  itemIDs: [],
  pagination: new Pagination()
};

export const homeScreenReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(HomeScreenActions.resetState, () => initialState)
    .addCase(HomeScreenActions.loadItemsSuccess, (state, { payload: { data, ...pagination } }) => {
      state.itemIDs =
        state.pagination.currentPage < pagination.currentPage
          ? state.itemIDs.concat(data.map((item) => item.id))
          : data.map((item) => item.id);
      state.pagination = pagination;
    });
});
