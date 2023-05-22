import { useSelector } from 'react-redux';
import { AuthSelectors } from '@libs/shared/data-access/auth';
import { AppActions } from '@libs/shared/data-access/store';
import { storeRef } from '@libs/shared/data-access/store/store-ref';

class AppFacade {
  public get isAuthenticated(): boolean {
    return useSelector(AuthSelectors.isAuthenticated);
  }

  public get isTokenLoaded(): boolean {
    return useSelector(AuthSelectors.isTokenLoaded);
  }

  public init(): void {
    storeRef.dispatch(AppActions.init());
  }
}

export const appFacade = new AppFacade();
