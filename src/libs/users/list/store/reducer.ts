import { createReducer } from '@reduxjs/toolkit';
import {
  baseEntityStoreReducer,
  BaseListedEntityState,
  baseListedInitialState
} from '../../../shared/data-access/base-listed-entity-store';
import { User } from '../../../shared/data-access/user';
import { usersListActions } from './actions';

export type UsersListState = BaseListedEntityState<User>;

const initialState: UsersListState = {
  ...baseListedInitialState
};

export const usersListReducer = createReducer(initialState, (builder) => baseEntityStoreReducer(initialState, usersListActions, builder));
