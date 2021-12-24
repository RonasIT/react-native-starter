import { AuthActions, AuthSelectors } from '@shared/auth';
import { ProfileActions } from '@shared/profile/store/actions';
import { store } from '@store';
import { AppActions } from '@store/actions';
import { Epics } from '@store/types';
import { ofType } from 'deox';
import { of } from 'rxjs';
import { catchError, delay, exhaustMap, filter, map, switchMap } from 'rxjs/operators';
import { pushNotificationsService } from '../service';
import { PushNotificationsActions } from './actions';

const RETRY_DELAY = 20 * 1000;

export const pushNotificationsEpics: Epics = {
  subscribe: (action$, state$) => action$.pipe(
    ofType([
      AuthActions.authorizeSuccess,
      ProfileActions.refreshProfileSuccess,
      PushNotificationsActions.reSubscribe()
    ]),
    filter(() => AuthSelectors.isAuthenticated(state$.value)),
    filter(() => !pushNotificationsService.pushToken),
    switchMap(async () => {
      try {
        return await pushNotificationsService.obtainPushNotificationsToken();
      } catch (error) {
        store.dispatch(PushNotificationsActions.subscribeFailure({ error }));
      }
    }),
    filter((token) => token?.length > 0),
    exhaustMap((token) => pushNotificationsService.subscribeDevice(token).pipe(
      map(() => PushNotificationsActions.subscribeSuccess({ pushToken: token })),
      catchError((error) => of(PushNotificationsActions.subscribeFailure({ error })))
    ))
  ),

  subscribeFailure: (action$) => action$.pipe(
    ofType(PushNotificationsActions.subscribeFailure),
    delay(RETRY_DELAY),
    map(() => PushNotificationsActions.reSubscribe())
  ),

  unsubscribe: (action$, state$) => action$.pipe(
    ofType(AuthActions.unauthorize),
    exhaustMap(() => AuthSelectors.isAuthenticated(state$.value)
      ? pushNotificationsService.unsubscribeDevice().pipe(
        map(() => true),
        catchError(() => of(true))
      )
      : of(true)),
    map(() => AppActions.noop())
  )
};
