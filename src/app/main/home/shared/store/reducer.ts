import { createReducer } from '@reduxjs/toolkit';
import {
  baseEntityStoreReducer,
  BaseListedEntityState,
  baseListedInitialState
} from '../../../../../libs/shared/data-access/base-listed-entity-store';
import { User } from '../../../../../libs/shared/data-access/user';
import { homeScreenActions } from './actions';

export type HomeScreenState = BaseListedEntityState<User>;

const initialState: HomeScreenState = {
  ...baseListedInitialState
};

export const homeScreenReducer = createReducer(initialState, (builder) => baseEntityStoreReducer(initialState, homeScreenActions, builder));
