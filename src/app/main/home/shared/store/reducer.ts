import { baseEntityStoreReducer } from '@shared/base-listed-entity-store/store';
import { createReducer } from 'deox';
import { homeScreenActions } from './actions';
import { HomeScreenState } from './state';

const initialState = new HomeScreenState();

export const homeScreenReducer = createReducer(initialState, (handleAction) => baseEntityStoreReducer(initialState, homeScreenActions, handleAction));
