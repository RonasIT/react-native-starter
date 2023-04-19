import { checkIsAuthenticated } from '@shared/data-access/auth';

export const authenticatedScreenListeners = {
  state: (): void => {
    checkIsAuthenticated();
  }
};
