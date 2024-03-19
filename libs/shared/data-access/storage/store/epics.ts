import { filter, map } from 'rxjs/operators';
import { AuthActions } from '@libs/shared/data-access/api/auth/store/actions';
import { AppActions } from '@libs/shared/data-access/store/actions';
import { appStorageService } from '../service';
import type { Epics } from '@libs/shared/data-access/store';

export const appStorageEpics: Epics = {
  authorizeSuccess: (action$) => action$.pipe(
    filter(AuthActions.saveToken.match),
    map(({ payload }) => appStorageService.token.set(payload.token)),
    map(() => AppActions.noop()),
  ),

  unauthorize: (action$) => action$.pipe(
    filter(AuthActions.clearToken.match),
    map(() => appStorageService.token.remove()),
    map(() => AppActions.noop()),
  )
};
