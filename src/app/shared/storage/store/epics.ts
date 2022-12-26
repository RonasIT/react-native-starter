import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AuthSelectors } from '@shared/auth';
import { AuthActions } from '@shared/auth/store/actions';
import { LocalAuthActions } from '@shared/local-auth';
import { Epics } from '@store';
import { AppActions } from '@store/actions';
import { appStorageService } from '../service';

export const appStorageEpics: Epics = {
  setUserAuthData: (action$, state$) => action$.pipe(
    filter(LocalAuthActions.setPin.match),
    map(({ payload }) => appStorageService.pin.set(payload.pin)),
    withLatestFrom(state$),
    map(([_, state]) => appStorageService.token.set(AuthSelectors.token(state))),
    map(() => LocalAuthActions.localAuthSuccess())
  ),

  unauthorize: (action$) => action$.pipe(
    filter(AuthActions.unauthorize.match),
    map(() => appStorageService.token.remove()),
    map(() => appStorageService.pin.remove()),
    map(() => AppActions.noop())
  )
};
