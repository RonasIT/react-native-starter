import { isAnyOf } from '@reduxjs/toolkit';
import { filter, map, tap } from 'rxjs/operators';
import { AuthActions } from '@shared/auth/store/actions';
import { LocalAuthActions } from '@shared/local-auth';
import { AppActions } from '@store/actions';
import { Epics } from '@store/types/epics';
import { appNavigationService } from '../service';

export const appNavigationEpics: Epics = {
  authorizeSuccessNavigation: (action$) => action$.pipe(
    filter(AuthActions.authorizeSuccess.match),
    tap(() => {
      const interruptedNavigation = appNavigationService.savedState;

      if (interruptedNavigation) {
        appNavigationService.resetToState(interruptedNavigation);
      } else {
        appNavigationService.navigate('Pin', { isPinSet: false });
      }
    }),
    map(() => AppActions.noop())
  ),

  localAuthSuccess: (action$) => action$.pipe(
    filter(isAnyOf(LocalAuthActions.setPin.match, LocalAuthActions.localAuthSuccess.match)),
    tap(() => {
      appNavigationService.resetToRoute('Main');
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
    tap(() => appNavigationService.resetToRoute('AccountAccess', [{ name: 'Login' }])),
    map(() => AppActions.noop())
  )
};
