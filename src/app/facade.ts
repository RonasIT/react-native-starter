import { AuthSelectors } from '@shared/auth';
import { AppActions } from '@store';
import { useSelector } from 'react-redux';
import { storeHandle } from '@store/store-handle';

class AppFacade {
  public get isAuthenticated(): boolean {
    return useSelector(AuthSelectors.isAuthenticated);
  }

  public get isTokenLoaded(): boolean {
    return useSelector(AuthSelectors.isTokenLoaded);
  }

  public init(): void {
    storeHandle.dispatch(AppActions.init());
  }
}

export const appFacade = new AppFacade();
