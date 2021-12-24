import { AuthCredentials } from '@shared/auth/models';
import { AuthActions } from '@shared/auth/store/actions';
import { store } from '@store/store';
import { useSelector } from 'react-redux';
import { LoginForm } from './shared/forms';
import { LoginScreenActions, LoginScreenSelectors } from './shared/store';

class LoginScreenFacade {
  public get isSubmitting(): boolean {
    return useSelector(LoginScreenSelectors.isSubmitting);
  }

  public reset(): void {
    store.dispatch(LoginScreenActions.resetState());
  }

  public authorize(values: LoginForm): void {
    store.dispatch(AuthActions.authorize(new AuthCredentials(values)));
  }
}

export const loginScreenFacade = new LoginScreenFacade();
