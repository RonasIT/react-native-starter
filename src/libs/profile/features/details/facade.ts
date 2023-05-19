import { useSelector } from 'react-redux';
import { AuthActions } from '@libs/shared/data-access/auth';
import { ProfileSelectors } from '@libs/shared/data-access/profile';
import { storeRef } from '@libs/shared/data-access/store/store-ref';
import { User } from '@libs/shared/data-access/user';

class ProfileDetailsFacade {
  public get profile(): User {
    return useSelector(ProfileSelectors.profile);
  }

  public logout(): void {
    storeRef.dispatch(AuthActions.unauthorize({}));
  }
}

export const profileDetailsFacade = new ProfileDetailsFacade();
