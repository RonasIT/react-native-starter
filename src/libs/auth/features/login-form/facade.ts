import { useSelector } from 'react-redux';
import { AuthCredentials } from '@libs/shared/data-access/auth/models';
import { AuthActions, AuthSelectors } from '@libs/shared/data-access/auth/store';
import { storeRef } from '@libs/shared/data-access/store/store-ref';
import { LoginFormSchema } from './forms';

class LoginScreenFacade {
  public get isSubmitting(): boolean {
    return useSelector(AuthSelectors.isAuthorizing);
  }

  public authorize(values: LoginFormSchema): void {
    storeRef.dispatch(AuthActions.authorize(new AuthCredentials(values)));
  }
}

export const loginScreenFacade = new LoginScreenFacade();
