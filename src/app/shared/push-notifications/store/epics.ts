import { AuthActions } from '@shared/auth/store/actions';
import { AuthSelectors } from '@shared/auth/store/selectors';
import { ProfileActions } from '@shared/profile/store/actions';
import { AppActions } from '@store/actions';
import { Epics } from '@store/types';
import { of } from 'rxjs';
import { catchError, delay, exhaustMap, filter, map, switchMap } from 'rxjs/operators';
import { pushNotificationsService } from '../service';
import { PushNotificationsActions } from './actions';

const RETRY_DELAY = 20 * 1000;

export const pushNotificationsEpics: Epics = {
  subscribe: (action$, state$, { useDispatch }) => action$.pipe(
    filter((action) => [
      AuthActions.authorizeSuccess.type,
      ProfileActions.refreshProfileSuccess.type,
      PushNotificationsActions.reSubscribe.type
    ].includes(action.type)),
    filter(() => AuthSelectors.isAuthenticated(state$.value)),
    filter(() => !pushNotificationsService.pushToken),
    switchMap(async () => {
      try {
        return await pushNotificationsService.obtainPushNotificationsToken();
      } catch (error) {
        useDispatch()(PushNotificationsActions.subscribeFailure({ error }));
      }
    }),
    filter((token) => !!token?.length),
    exhaustMap((token) => pushNotificationsService.subscribeDevice(token).pipe(
      map(() => PushNotificationsActions.subscribeSuccess({ pushToken: token })),
      catchError((error) => of(PushNotificationsActions.subscribeFailure({ error })))
    ))
  ),

  subscribeFailure: (action$) => action$.pipe(
    filter(PushNotificationsActions.subscribeFailure.match),
    delay(RETRY_DELAY),
    map(() => PushNotificationsActions.reSubscribe())
  ),

  unsubscribe: (action$, state$) => action$.pipe(
    filter(AuthActions.unauthorize.match),
    exhaustMap(() => AuthSelectors.isAuthenticated(state$.value)
      ? pushNotificationsService.unsubscribeDevice().pipe(
        map(() => true),
        catchError(() => of(true))
      )
      : of(true)),
    map(() => AppActions.noop())
  )
};
