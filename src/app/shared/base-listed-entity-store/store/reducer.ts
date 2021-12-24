import { CreateHandlerMap } from 'deox/dist/create-handler-map';
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
    handleAction: CreateHandlerMap<TState>
  ) => [
    handleAction(actions.resetState, () => initialState),
    handleAction(actions.refreshItems, (state) => ({
      ...state,
      isRefreshing: true
    })),
    handleAction(actions.loadItems, (state) => ({
      ...state,
      isLoading: true
    })),
    handleAction(actions.loadItemsSuccess, (state, { payload: { data, ...pagination } }) => ({
      ...state,
      isLoading: false,
      isRefreshing: false,
      itemIDs:
      state.pagination.currentPage < pagination.currentPage
        ? state.itemIDs.concat(data.map((item) => item.id))
        : data.map((item) => item.id),
      pagination
    })),
    handleAction(actions.loadItemsFailure, (state) => ({
      ...state,
      isLoading: false,
      isRefreshing: false
    })),
    handleAction(actions.changeFilter, (state, { payload }) => ({
      ...state,
      filters: {
        ...state.filters,
        ...payload
      }
    })),
    handleAction(actions.changeSearchQuery, (state, { payload }) => ({
      ...state,
      filters: {
        ...state.filters,
        query: payload.query
      }
    })),
    handleAction(actions.resetFilter, (state) => ({
      ...state,
      filters: initialState.filters
    })),
    handleAction([actions.deleteItemSuccess, actions.deleted], (state, { payload }) => ({
      ...state,
      itemIDs: state.itemIDs.filter((itemID) => itemID !== payload.item.id)
    }))
  ];
