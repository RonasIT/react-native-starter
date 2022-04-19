import { storeRef } from '@store/store-ref';
import { AuthActions } from '../store/actions';
import { AuthSelectors } from '../store/selectors';

export function checkIsAuthenticated(unauthenticateOnFail = true): boolean {
  const isAuthenticated = AuthSelectors.isAuthenticated(storeRef.getState());
  if (!isAuthenticated && unauthenticateOnFail) {
    storeRef.dispatch(AuthActions.unauthorize({ keepInterruptedNavigation: true }));
  }

  return isAuthenticated;
}
