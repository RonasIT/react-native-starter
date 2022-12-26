import { useSelector } from 'react-redux';
import { AuthSelectors } from '@shared/auth';
import { LocalAuthSelectors } from '@shared/local-auth';
import { AppActions } from '@store';
import { storeRef } from '@store/store-ref';

class AppFacade {
  public get isAuthenticated(): boolean {
    return useSelector(AuthSelectors.isAuthenticated);
  }

  public get isTokenLoaded(): boolean {
    return useSelector(AuthSelectors.isTokenLoaded);
  }

  public get isLocalAuthenticated(): boolean {
    return useSelector(LocalAuthSelectors.isLocalAuthenticated);
  }

  public init(): void {
    storeRef.dispatch(AppActions.init());
  }
}

export const appFacade = new AppFacade();
