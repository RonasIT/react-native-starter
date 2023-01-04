import { createReducer } from '@reduxjs/toolkit';
import {
  baseEntityStoreReducer,
  BaseListedEntityState,
  baseListedInitialState
} from '@shared/base-listed-entity-store/store';
import { User } from '@shared/user';
import { homeScreenActions } from './actions';

export type HomeScreenState = BaseListedEntityState<User>;

const initialState: HomeScreenState = {
  ...baseListedInitialState
};

export const homeScreenReducer = createReducer(initialState, (builder) => baseEntityStoreReducer(initialState, homeScreenActions, builder));
