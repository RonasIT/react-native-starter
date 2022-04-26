import { AuthActions, unauthorizePayload } from '@shared/auth/store/actions';
import { AppActions } from '@store/actions';
import { Epics } from '@store/types/epics';
import { delay, filter, map, tap } from 'rxjs/operators';
import { appNavigationService } from '../service';
import { PayloadAction } from '@reduxjs/toolkit';

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
    tap<PayloadAction<unauthorizePayload>>(({ payload }) => {
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
