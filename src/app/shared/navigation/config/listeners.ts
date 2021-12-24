import { checkIsAuthenticated } from '@shared/auth/utils';

export const authenticatedScreenListeners = {
  state: (): void => {
    checkIsAuthenticated();
  }
};
