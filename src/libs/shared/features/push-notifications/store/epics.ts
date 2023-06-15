import { isAnyOf } from '@reduxjs/toolkit';
import { of } from 'rxjs';
import { catchError, delay, exhaustMap, filter, map, switchMap } from 'rxjs/operators';
import { authAPI } from '@libs/shared/data-access/api/auth/api';
import { AuthActions } from '@libs/shared/data-access/api/auth/store/actions';
import { AuthSelectors } from '@libs/shared/data-access/api/auth/store/selectors';
import { profileAPI } from '@libs/shared/data-access/api/profile/api';
import { AppActions } from '@libs/shared/data-access/store/actions';
import { Epics } from '@libs/shared/data-access/store/types';
import { pushNotificationsService } from '../service';
import { PushNotificationsActions } from './actions';

const RETRY_DELAY = 20 * 1000;

export const pushNotificationsEpics: Epics = {
  subscribe: (action$, state$, { useDispatch }) => action$.pipe(
    filter(
      isAnyOf(
        authAPI.endpoints.authorize.matchFulfilled,
        profileAPI.endpoints.get.matchFulfilled,
        authAPI.endpoints.demoAuthorize.matchFulfilled,
        profileAPI.endpoints.getDemo.matchFulfilled,
        PushNotificationsActions.reSubscribe
      )
    ),
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
