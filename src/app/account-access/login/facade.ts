import { useSelector } from 'react-redux';
import { AuthCredentials } from '@shared/auth/models';
import { AuthActions, AuthSelectors } from '@shared/auth/store';
import { storeRef } from '@store/store-ref';
import { LoginForm } from './shared/forms';

class LoginScreenFacade {
  public get isSubmitting(): boolean {
    return useSelector(AuthSelectors.isAuthorizing);
  }

  public authorize(values: LoginForm): void {
    storeRef.dispatch(AuthActions.authorize(new AuthCredentials(values)));
  }
}

export const loginScreenFacade = new LoginScreenFacade();
