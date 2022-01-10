import { storeHandle } from '@store/store-handle';
import { AuthActions } from '../store/actions';
import { AuthSelectors } from '../store/selectors';

export function checkIsAuthenticated(unauthenticateOnFail = true): boolean {
  const isAuthenticated = AuthSelectors.isAuthenticated(storeHandle.getState());
  if (!isAuthenticated && unauthenticateOnFail) {
    storeHandle.dispatch(AuthActions.unauthorize({ keepInterruptedNavigation: true }));
  }

  return isAuthenticated;
}
