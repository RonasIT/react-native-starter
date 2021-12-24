import { User } from '@shared/user';
import { action, actionWithPayload } from '@store/action-factory';
import { AxiosError } from 'axios';

export class ProfileActions {
  public static refreshProfile = action(
    '[User] Refresh Profile'
  );

  public static refreshProfileSuccess = actionWithPayload<User>(
    '[User] Refresh Profile Success'
  );

  public static refreshProfileFailure = actionWithPayload<AxiosError>(
    '[User] Refresh Profile Failure'
  );

  public static patchProfileState = actionWithPayload<Partial<User>>(
    '[User] Patch profile state'
  );

  public static updateProfile = actionWithPayload<User>(
    '[User] Update Profile'
  );

  public static updateProfileSuccess = actionWithPayload<User>(
    '[User] Update Profile Success'
  );

  public static updateProfileFailure = actionWithPayload<AxiosError>(
    '[User] Update Profile Failure'
  );

  public static clearProfile = action(
    '[User] Clear profile'
  );
}
