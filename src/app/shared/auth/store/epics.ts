import { of } from 'rxjs';
import { catchError, delay, exhaustMap, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { formDataInterceptor } from '@shared/api/interceptors/form-data';
import { apiPromiseService } from '@shared/api/promise-service';
import { apiService } from '@shared/api/service';
import { appStorageService } from '@shared/storage';
import { AppActions } from '@store/actions';
import { Epics } from '@store/types';
import { tokenInterceptor, unauthorizedInterceptor } from '../../api/interceptors';
import { authService } from '../service';
import { AuthActions } from './actions';
import { AuthSelectors } from './selectors';

export const authEpics: Epics = {
  onInit: (action$, _, { useDispatch, useGetState }) => action$.pipe(
    filter(AppActions.init.match),
    tap(() => {
      const getState = useGetState();
      const getToken = (): string => AuthSelectors.token(getState());
      const dispatch = useDispatch();

      apiService.useInterceptors({
        request: [
          /*[
            refreshTokenInterceptor({
              onError: () => dispatch(AuthActions.unauthorize({ keepInterruptedNavigation: true })),
              onSuccess: (token: string) => dispatch(AuthActions.saveToken({ token })),
              getToken,
              checkIsTokenExpired,
              refreshToken: () => authService.refreshToken()
            })
          ],*/
          [tokenInterceptor(getToken)],
          [formDataInterceptor()]
        ],
        response: [
          [
            undefined,
            unauthorizedInterceptor({
              onError: () => dispatch(AuthActions.unauthorize({ keepInterruptedNavigation: true }))
            })
          ]
        ]
      });
      apiPromiseService.useInterceptors({
        request: [
          /*[
            refreshTokenInterceptor({
              onError: () => dispatch(AuthActions.unauthorize({ keepInterruptedNavigation: true })),
              onSuccess: (token: string) => dispatch(AuthActions.saveToken({ token })),
              getToken,
              checkIsTokenExpired,
              refreshToken: () => authService.refreshToken()
            })
          ],*/
          [tokenInterceptor(getToken)],
          [formDataInterceptor()]
        ],
        response: [
          [
            undefined,
            unauthorizedInterceptor({
              onError: () => dispatch(AuthActions.unauthorize({ keepInterruptedNavigation: true }))
            })
          ]
        ]
      });
    }),
    switchMap(() => appStorageService.token.get()),
    map((token) => AuthActions.saveToken({ token }))
  ),

  saveToken: (action$, state$) => action$.pipe(
    filter(AuthActions.saveToken.match),
    withLatestFrom(state$),
    filter(([_, state]) => !AuthSelectors.isTokenLoaded(state)),
    map(() => AuthActions.tokenLoaded())
  ),

  authorize: (action$) => action$.pipe(
    filter(AuthActions.authorize.match),
    exhaustMap((action) => authService.demoAuthorize({ ...action.payload }).pipe(
      map((response) => AuthActions.authorizeSuccess(response)),
      catchError((error) => of(AuthActions.authorizeFailure(error)))
    ))
  ),

  authorizeSuccess: (action$) => action$.pipe(
    filter(AuthActions.authorizeSuccess.match),
    map(({ payload }) => AuthActions.saveToken({ token: payload.token }))
  ),

  unauthorize: (action$, state$) => action$.pipe(
    filter(AuthActions.unauthorize.match),
    delay(300),
    withLatestFrom(state$),
    map(() => AuthActions.clearToken())
  )
};
