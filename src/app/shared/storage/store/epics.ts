import { filter, map } from 'rxjs/operators';
import { AuthActions } from '@shared/auth/store/actions';
import { Epics } from '@store';
import { AppActions } from '@store/actions';
import { appStorageService } from '../service';

export const appStorageEpics: Epics = {
  authorizeSuccess: (action$) => action$.pipe(
    filter(AuthActions.saveToken.match),
    map(({ payload }) => appStorageService.token.set(payload.token)),
    map(() => AppActions.noop())
  ),

  unauthorize: (action$) => action$.pipe(
    filter(AuthActions.clearToken.match),
    map(() => appStorageService.token.remove()),
    map(() => AppActions.noop())
  )
};
