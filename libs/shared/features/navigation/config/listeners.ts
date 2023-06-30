import { checkIsAuthenticated } from '@libs/shared/data-access/api/auth/utils';
import { AppState } from '@libs/shared/data-access/store';
import { EventMapBase, NavigationState, ScreenListeners } from '@react-navigation/native';
import { Store } from '@reduxjs/toolkit';

export const createAuthenticatedScreenListeners = (
  store: Partial<Store<AppState>>
): ScreenListeners<NavigationState, EventMapBase> => ({
  state: () => {
    checkIsAuthenticated(store)();
  }
});
