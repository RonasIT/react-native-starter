import { createReducer } from '@reduxjs/toolkit';
import { merge } from 'lodash';
import { AuthActions } from '@shared/auth/store/actions';
import { User } from '@shared/user';
import { ProfileActions } from './actions';

export interface ProfileState {
  profile: User;
  isRefreshing: boolean;
  isUpdating: boolean;
}

const initialState: ProfileState = {
  profile: null,
  isRefreshing: false,
  isUpdating: false
};

export const profileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ProfileActions.refreshProfile, (state) => {
      state.isRefreshing = true;
    })
    .addCase(ProfileActions.refreshProfileSuccess, (state, { payload }) => {
      state.isRefreshing = false;
      state.profile = payload;
    })
    .addCase(ProfileActions.refreshProfileFailure, (state) => {
      state.isRefreshing = false;
    })
    .addCase(ProfileActions.updateProfile, (state) => {
      state.isUpdating = true;
    })
    .addCase(ProfileActions.updateProfileSuccess, (state, { payload }) => {
      state.isUpdating = false;
      state.profile = payload;
    })
    .addCase(ProfileActions.updateProfileFailure, (state) => {
      state.isUpdating = false;
    })
    .addCase(ProfileActions.patchProfileState, (state, { payload }) => {
      state.profile = new User(merge(state.profile, payload));
    })
    .addCase(AuthActions.authorizeSuccess, (state, { payload }) => {
      state.profile = payload.user;
    })
    .addCase(AuthActions.unauthorize, (state) => {
      state.profile = null;
    });
});
