import { storeRef } from '@store/store-ref';
import { AuthActions } from '@shared/auth';
import { ProfileSelectors } from '@shared/profile';
import { User } from '@shared/user';
import { useSelector } from 'react-redux';

class ProfileScreenFacade {
  public get profile(): User {
    return useSelector(ProfileSelectors.profile);
  }

  public logout(): void {
    storeRef.dispatch(AuthActions.unauthorize({}));
  }
}

export const profileScreenFacade = new ProfileScreenFacade();
