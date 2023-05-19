import { checkIsAuthenticated } from '@libs/shared/data-access/auth';

export const authenticatedScreenListeners = {
  state: (): void => {
    checkIsAuthenticated();
  }
};
