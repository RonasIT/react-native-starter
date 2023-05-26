import { AxiosError } from 'axios';
import { User } from '@libs/shared/data-access/api/user/models';
import { defineAction } from '@libs/shared/data-access/store/utils';

export class ProfileActions {
  public static refreshProfile = defineAction(
    '[Profile] Refresh Profile'
  );

  public static refreshProfileSuccess = defineAction<User>(
    '[Profile] Refresh Profile Success'
  );

  public static refreshProfileFailure = defineAction<AxiosError>(
    '[Profile] Refresh Profile Failure'
  );

  public static patchProfileState = defineAction<Partial<User>>(
    '[Profile] Patch profile state'
  );

  public static updateProfile = defineAction(
    '[Profile] Update Profile'
  );

  public static updateProfileSuccess = defineAction<User>(
    '[Profile] Update Profile Success'
  );

  public static updateProfileFailure = defineAction<AxiosError>(
    '[Profile] Update Profile Failure'
  );

  public static clearProfile = defineAction(
    '[Profile] Clear profile'
  );
}
