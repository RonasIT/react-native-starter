import { AuthActions } from '@shared/auth/store/actions';
import { AppActions } from '@store/actions';
import { store } from '@store/store';
import { ofType } from 'deox';
import { Epic } from 'redux-observable';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { appNavigationService } from '../service';
import { AppNavigationActions } from './actions';
import { AppNavigationSelectors } from './selectors';

export const appNavigationEpics: Record<string, Epic> = {
  authorizeSuccessNavigation: (action$, state$) => action$.pipe(
    ofType(AuthActions.authorizeSuccess),
    delay(100),
    withLatestFrom(state$),
    tap(([_, state]) => {
      const interruptedNavigation = AppNavigationSelectors.interruptedNavigation(state);

      if (interruptedNavigation) {
        appNavigationService.resetToState(interruptedNavigation);
      } else {
        appNavigationService.resetToRoute('Private');
      }
    }),
    map(() => AppNavigationActions.clearInterruptedNavigation())
  ),

  interruptedNavigationSaving: (action$) => action$.pipe(
    ofType(AuthActions.unauthorize),
    tap(({ payload }) => {
      store.dispatch(
        payload.keepInterruptedNavigation
          ? AppNavigationActions.saveInterruptedNavigation({
            navigationState: appNavigationService.currentState
          })
          : AppNavigationActions.clearInterruptedNavigation()
      );
    }),
    tap(() => appNavigationService.resetToRoute('Public')),
    map(() => AppActions.noop())
  )
};
