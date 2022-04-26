import { User } from '@shared/user';
import { createAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export class ProfileActions {
  public static refreshProfile = createAction(
    '[Profile] Refresh Profile'
  );

  public static refreshProfileSuccess = createAction<User>(
    '[Profile] Refresh Profile Success'
  );

  public static refreshProfileFailure = createAction<AxiosError>(
    '[Profile] Refresh Profile Failure'
  );

  public static patchProfileState = createAction<Partial<User>>(
    '[Profile] Patch profile state'
  );

  public static updateProfile = createAction(
    '[Profile] Update Profile'
  );

  public static updateProfileSuccess = createAction<User>(
    '[Profile] Update Profile Success'
  );

  public static updateProfileFailure = createAction<AxiosError>(
    '[Profile] Update Profile Failure'
  );

  public static clearProfile = createAction(
    '[Profile] Clear profile'
  );
}
