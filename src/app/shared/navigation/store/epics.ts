import { AuthActions, unauthorizePayload } from '@shared/auth/store/actions';
import { AppActions } from '@store/actions';
import { Epics } from '@store/types/epics';
import { ofType } from 'deox';
import { delay, map, tap } from 'rxjs/operators';
import { appNavigationService } from '../service';
import { PayloadAction } from '@reduxjs/toolkit';

export const appNavigationEpics: Epics = {
  authorizeSuccessNavigation: (action$) => action$.pipe(
    ofType(AuthActions.authorizeSuccess),
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
    ofType(AuthActions.unauthorize),
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
