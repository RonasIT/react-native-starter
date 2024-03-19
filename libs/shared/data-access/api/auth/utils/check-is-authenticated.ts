import { Store } from '@reduxjs/toolkit';
import { AuthActions } from '../store/actions';
import { AuthSelectors } from '../store/selectors';
import type { AppState } from '@libs/shared/data-access/store';

export const checkIsAuthenticated =
  (store: Partial<Store<AppState>>) => (unauthenticateOnFail = true): boolean => {
    if (store.getState) {
      const isAuthenticated = AuthSelectors.isAuthenticated(store.getState?.());

      if (!isAuthenticated && unauthenticateOnFail) {
        store.dispatch?.(AuthActions.unauthorize({ keepInterruptedNavigation: true }));
      }

      return isAuthenticated;
    } else return false;
  };
