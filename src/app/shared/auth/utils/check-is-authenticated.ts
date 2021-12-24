import { store } from '@store/store';
import { AuthActions } from '../store/actions';
import { AuthSelectors } from '../store/selectors';

export function checkIsAuthenticated(unauthenticateOnFail = true): boolean {
  const isAuthenticated = AuthSelectors.isAuthenticated(store.getState());
  if (!isAuthenticated && unauthenticateOnFail) {
    store.dispatch(AuthActions.unauthorize({ keepInterruptedNavigation: true }));
  }

  return isAuthenticated;
}
