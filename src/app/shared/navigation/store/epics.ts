import { AuthActions } from '@shared/auth/store/actions';
import { AppActions } from '@store/actions';
import { Epics } from '@store/types/epics';
import { ofType } from 'deox';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { appNavigationService } from '../service';
import { AppNavigationActions } from './actions';
import { AppNavigationSelectors } from './selectors';

export const appNavigationEpics: Epics = {
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

  interruptedNavigationSaving: (action$, _, { useDispatch }) => action$.pipe(
    ofType(AuthActions.unauthorize),
    tap(({ payload }) => {
      const dispatch = useDispatch();

      dispatch(
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
