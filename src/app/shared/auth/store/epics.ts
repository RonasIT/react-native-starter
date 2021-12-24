import { appStorageService } from '@shared/storage';
import { AppActions } from '@store/actions';
import { Epics } from '@store/types';
import { ofType } from 'deox';
import { of } from 'rxjs';
import { catchError, delay, exhaustMap, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { authService } from '../service';
import { AuthActions } from './actions';
import { AuthSelectors } from './selectors';

export const authEpics: Epics = {
  onInit: (action$) => action$.pipe(
    ofType(AppActions.init),
    switchMap(() => appStorageService.token.get()),
    map((token) => AuthActions.saveToken({ token }))
  ),

  saveToken: (action$, state$) => action$.pipe(
    ofType(AuthActions.saveToken),
    withLatestFrom(state$),
    filter(([_, state]) => !AuthSelectors.isTokenLoaded(state)),
    map(() => AuthActions.tokenLoaded())
  ),

  authorize: (action$) => action$.pipe(
    ofType(AuthActions.authorize),
    exhaustMap((action) => authService.authorize({ ...action.payload }).pipe(
      map((response) => AuthActions.authorizeSuccess(response)),
      catchError((error) => of(AuthActions.authorizeFailure(error)))
    ))
  ),

  authorizeSuccess: (action$) => action$.pipe(
    ofType(AuthActions.authorizeSuccess),
    map(({ payload }) => AuthActions.saveToken({ token: payload.token }))
  ),

  unauthorize: (action$, state$) => action$.pipe(
    ofType(AuthActions.unauthorize),
    delay(300),
    withLatestFrom(state$),
    map(() => AuthActions.clearToken())
  )
};
