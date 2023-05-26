import { EventMapBase, NavigationState, ScreenListeners } from '@react-navigation/native';
import { Store } from '@reduxjs/toolkit';
import { checkIsAuthenticated } from '@libs/shared/data-access/auth';
import { AppState } from '@libs/shared/data-access/store';

export const createAuthenticatedScreenListeners = (
  store: Partial<Store<AppState>>
): ScreenListeners<NavigationState, EventMapBase> => ({
  state: () => {
    checkIsAuthenticated(store)();
  }
});
