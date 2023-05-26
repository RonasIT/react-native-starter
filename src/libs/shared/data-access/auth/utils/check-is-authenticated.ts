import { Store } from '@reduxjs/toolkit';
import { AppState } from '@libs/shared/data-access/store';
import { AuthActions } from '../store/actions';
import { AuthSelectors } from '../store/selectors';

export const checkIsAuthenticated =
  (store: Partial<Store<AppState>>) => (unauthenticateOnFail = true): boolean => {
    const isAuthenticated = AuthSelectors.isAuthenticated(store.getState());
    if (!isAuthenticated && unauthenticateOnFail) {
      store.dispatch(AuthActions.unauthorize({ keepInterruptedNavigation: true }));
    }

    return isAuthenticated;
  };
