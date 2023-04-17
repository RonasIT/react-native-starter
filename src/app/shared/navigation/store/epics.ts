import { delay, filter, map, tap } from 'rxjs/operators';
import { AuthActions } from '../../../../libs/shared/data-access/auth/store/actions';
import { AppActions } from '../../../../libs/shared/data-access/store/actions';
import { Epics } from '../../../../libs/shared/data-access/store/types/epics';
import { appNavigationService } from '../service';

export const appNavigationEpics: Epics = {
  authorizeSuccessNavigation: (action$) => action$.pipe(
    filter(AuthActions.authorizeSuccess.match),
    delay(100),
    tap(() => {
      const interruptedNavigation = appNavigationService.savedState;

      if (interruptedNavigation) {
        appNavigationService.resetToState(interruptedNavigation);
      } else {
        appNavigationService.resetToRoute('Main');
      }
    }),
    map(() => AppActions.noop())
  ),

  interruptedNavigationSaving: (action$) => action$.pipe(
    filter(AuthActions.unauthorize.match),
    tap(({ payload }) => {
      if (payload.keepInterruptedNavigation) {
        appNavigationService.saveCurrentState();
      } else {
        appNavigationService.clearSavedState();
      }
    }),
    tap(() => appNavigationService.resetToRoute('AccountAccess')),
    map(() => AppActions.noop())
  )
};
