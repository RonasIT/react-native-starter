import { AuthActions } from '@shared/auth/store/actions';
import { createReducer } from 'deox';
import { ProfileActions } from './actions';
import { ProfileState } from './state';
import { immutableMerge } from '@shared/immutable-merge';
import { User } from '@shared/user';

const initialState = new ProfileState();

export const profileReducer = createReducer(initialState, (handleAction) => [
  handleAction(ProfileActions.refreshProfile, (state) => ({
    ...state,
    isRefreshing: true
  })),
  handleAction(ProfileActions.refreshProfileSuccess, (state, { payload }) => ({
    ...state,
    profile: payload,
    isRefreshing: false
  })),
  handleAction(ProfileActions.refreshProfileFailure, (state) => ({
    ...state,
    isRefreshing: false
  })),
  handleAction(ProfileActions.updateProfile, (state) => ({
    ...state,
    isUpdating: true
  })),
  handleAction(ProfileActions.updateProfileSuccess, (state, { payload }) => ({
    ...state,
    profile: payload,
    isUpdating: false
  })),
  handleAction(ProfileActions.updateProfileFailure, (state) => ({
    ...state,
    isUpdating: false
  })),
  handleAction(ProfileActions.patchProfileState, (state, { payload }) => ({
    ...state,
    profile: new User(immutableMerge(state.profile, payload))
  })),
  handleAction(AuthActions.authorizeSuccess, (state, { payload }) => ({
    ...state,
    profile: payload.user
  })),
  handleAction(AuthActions.unauthorize, (state) => ({
    ...state,
    profile: null
  }))
]);
