import { AuthenticationType } from 'expo-local-authentication';
import { omit } from 'lodash';
import { of } from 'rxjs';
import { exhaustMap, filter, map, withLatestFrom, mergeMap, catchError } from 'rxjs/operators';
import { AuthSelectors } from '@shared/auth';
import { AppActions } from '@store/actions';
import { Epics } from '@store/types';
import { localAuthService } from '../service';
import { LocalAuthActions } from './actions';
import { LocalAuthSelectors } from './selectors';

export const localAuthEpics: Epics = {
  checkSupportedAuthentication: (action$) => action$.pipe(
    filter(AppActions.init.match),
    exhaustMap(() => localAuthService.checkSupportedAuthentication().pipe(
      mergeMap((types) => {
        const filteredTypes = omit(types, [AuthenticationType.IRIS]);

        return [
          LocalAuthActions.setSupportedAuthenticationTypes({ types: filteredTypes }),
          LocalAuthActions.authenticate()
        ];
      })
    ))
  ),

  authenticate: (action$, state$) => action$.pipe(
    filter(LocalAuthActions.authenticate.match),
    withLatestFrom(state$),
    filter(
      ([_, state]) => !!LocalAuthSelectors.supportedAuthenticationTypes(state) && !!AuthSelectors.isAuthenticated(state)
    ),
    exhaustMap(() => localAuthService.authenticate().pipe(
      map((result) => (result.success ? LocalAuthActions.localAuthSuccess() : AppActions.noop())),
      catchError(() => of(AppActions.noop()))
    ))
  )
};
