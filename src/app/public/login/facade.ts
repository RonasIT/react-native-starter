import { storeHandle } from '@store/store-handle';
import { AuthCredentials } from '@shared/auth/models';
import { AuthActions, AuthSelectors } from '@shared/auth/store';
import { useSelector } from 'react-redux';
import { LoginForm } from './shared/forms';

class LoginScreenFacade {
  public get isSubmitting(): boolean {
    return useSelector(AuthSelectors.isAuthorizing);
  }

  public authorize(values: LoginForm): void {
    storeHandle.dispatch(AuthActions.authorize(new AuthCredentials(values)));
  }
}

export const loginScreenFacade = new LoginScreenFacade();
