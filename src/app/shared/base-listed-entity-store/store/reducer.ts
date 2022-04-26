import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BaseListedEntityActions } from './actions';
import { BaseListedEntityState } from './state';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const baseEntityStoreReducer = <
  TState extends BaseListedEntityState,
  TActions extends BaseListedEntityActions<TState> = BaseListedEntityActions<TState>
>(
    initialState: TState,
    actions: TActions,
    builder: ActionReducerMapBuilder<TState>
  ) => builder
    .addCase(actions.resetState, () => initialState)
    .addCase(actions.refreshItems, (state) => {
      state.isRefreshing = true;
    })
    .addCase(actions.loadItems, (state) => {
      state.isLoading = true;
    })
    .addCase(actions.loadItemsSuccess, (state, { payload: { data, ...pagination } }) => {
      state.isLoading = false;
      state.isRefreshing = false;
      state.itemIDs =
        state.pagination.currentPage < pagination.currentPage
          ? state.itemIDs.concat(data.map((item) => item.id))
          : data.map((item) => item.id);
      state.pagination = pagination;
    })
    .addCase(actions.loadItemsFailure, (state) => {
      state.isLoading = false;
      state.isRefreshing = false;
    })
    .addCase(actions.changeFilter, (state, { payload }) => {
      state.filters = { ...state.filters, ...payload };
    })
    .addCase(actions.changeSearchQuery, (state, { payload }) => {
      state.filters = {
        ...state.filters,
        query: payload.query
      };
    })
    .addCase(actions.resetFilter, (state) => {
      state.filters = initialState.filters;
    })
    .addCase(actions.deleted, (state, { payload }) => ({
      ...state,
      itemIDs: deleteItem(state.itemIDs, payload.item.id)
    }))
    .addCase(actions.deleteItemSuccess, (state, { payload }) => ({
      ...state,
      itemIDs: deleteItem(state.itemIDs, payload.item.id)
    }));

const deleteItem = <TID = string | number>(itemsIDs: Array<TID>, deletedItemID: TID): Array<TID> => {
  return itemsIDs.filter((itemID) => itemID !== deletedItemID);
};
