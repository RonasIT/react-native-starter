import { checkIsAuthenticated } from '../../../data-access/auth';

export const authenticatedScreenListeners = {
  state: (): void => {
    checkIsAuthenticated();
  }
};
