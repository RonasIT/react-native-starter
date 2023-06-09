import { isAnyOf } from '@reduxjs/toolkit';
import { delay, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { apiService } from '@libs/shared/data-access/api-client';
import { unauthorizedInterceptor } from '@libs/shared/data-access/api-client/interceptors';
import { formDataInterceptor } from '@libs/shared/data-access/api-client/interceptors/form-data';
import { appStorageService } from '@libs/shared/data-access/storage';
import { AppActions } from '@libs/shared/data-access/store/actions';
import { Epics } from '@libs/shared/data-access/store/types';
import { authAPI } from '../api';
import { AuthActions } from './actions';
import { AuthSelectors } from './selectors';

export const authEpics: Epics = {
  onInit: (action$, _, { useDispatch }) => action$.pipe(
    filter(AppActions.init.match),
    tap(() => {
      const dispatch = useDispatch();

      apiService.useInterceptors({
        request: [[formDataInterceptor()]],
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

  authorizeSuccess: (action$) => action$.pipe(
    filter(isAnyOf(authAPI.endpoints.authorize.matchFulfilled, authAPI.endpoints.demoAuthorize.matchFulfilled)),
    map(({ payload }) => AuthActions.saveToken({ token: payload.token }))
  ),

  unauthorize: (action$, state$) => action$.pipe(
    filter(AuthActions.unauthorize.match),
    delay(300),
    withLatestFrom(state$),
    map(() => AuthActions.clearToken())
  )
};
