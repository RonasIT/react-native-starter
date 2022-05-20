import { AuthActions } from '@shared/auth/store/actions';
import { Epics } from '@store';
import { AppActions } from '@store/actions';
import { filter, map } from 'rxjs/operators';
import { secureStorageService } from '../service';

export const secureStorageEpics: Epics = {
  authorizeSuccess: (action$) => action$.pipe(
    filter(AuthActions.saveToken.match),
    map(({ payload }) => secureStorageService.token.set(payload.token)),
    map(() => AppActions.noop())
  ),

  unauthorize: (action$) => action$.pipe(
    filter(AuthActions.clearToken.match),
    map(() => secureStorageService.token.remove()),
    map(() => AppActions.noop())
  )
};
