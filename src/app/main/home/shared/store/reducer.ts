import {
  baseEntityStoreReducer,
  BaseListedEntityState,
  baseListedInitialState
} from '@shared/base-listed-entity-store/store';
import { createReducer } from '@reduxjs/toolkit';
import { homeScreenActions } from './actions';
import { User } from '@shared/user';

export type HomeScreenState = BaseListedEntityState<User>;

const initialState: HomeScreenState = {
  ...baseListedInitialState
};

export const homeScreenReducer = createReducer(initialState, (builder) => baseEntityStoreReducer(initialState, homeScreenActions, builder));
