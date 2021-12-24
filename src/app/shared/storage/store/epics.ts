import { AuthActions } from '@shared/auth/store/actions';
import { Epics } from '@store';
import { AppActions } from '@store/actions';
import { ofType } from 'deox';
import { map } from 'rxjs/operators';
import { appStorageService } from '../service';

export const appStorageEpics: Epics = {
  authorizeSuccess: (action$) => action$.pipe(
    ofType(AuthActions.saveToken),
    map(({ payload }) => appStorageService.token.set(payload.token)),
    map(() => AppActions.noop())
  ),

  unauthorize: (action$) => action$.pipe(
    ofType(AuthActions.clearToken),
    map(() => appStorageService.token.remove()),
    map(() => AppActions.noop())
  )
};
