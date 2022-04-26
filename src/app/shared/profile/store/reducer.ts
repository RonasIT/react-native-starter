import { AuthActions } from '@shared/auth/store/actions';
import { createReducer } from '@reduxjs/toolkit';
import { ProfileActions } from './actions';
import { ProfileState } from './state';
import { User } from '@shared/user';
import { merge } from 'lodash';

const initialState = {
  profile: null
} as ProfileState;

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
