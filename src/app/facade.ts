import { AuthSelectors } from '@shared/auth';
import { AppActions, store } from '@store';
import { useSelector } from 'react-redux';

class AppFacade {
  public get isAuthenticated(): boolean {
    return useSelector(AuthSelectors.isAuthenticated);
  }

  public get isTokenLoaded(): boolean {
    return useSelector(AuthSelectors.isTokenLoaded);
  }

  public init(): void {
    store.dispatch(AppActions.init());
  }
}

export const appFacade = new AppFacade();
