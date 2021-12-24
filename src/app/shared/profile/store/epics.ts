import { AuthActions } from '@shared/auth/store/actions';
import { AuthSelectors } from '@shared/auth/store/selectors';
import { Epics } from '@store/types';
import { ofType } from 'deox';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, withLatestFrom } from 'rxjs/operators';
import { profileService } from '../service';
import { ProfileActions } from './actions';

export const profileEpics: Epics = {
  tokenLoaded: (action$, state$) => action$.pipe(
    ofType(AuthActions.tokenLoaded),
    withLatestFrom(state$),
    filter(([_, state]) => AuthSelectors.isAuthenticated(state)),
    map(() => ProfileActions.refreshProfile())
  ),

  saveToken: (action$) => action$.pipe(
    ofType(AuthActions.saveToken),
    map(() => ProfileActions.refreshProfile())
  ),

  unauthorize: (action$) => action$.pipe(
    ofType(AuthActions.unauthorize),
    map(() => ProfileActions.clearProfile())
  ),

  refreshProfile: (action$, state$) => action$.pipe(
    ofType(ProfileActions.refreshProfile),
    filter(() => AuthSelectors.isAuthenticated(state$.value)),
    exhaustMap(() => profileService.getProfile().pipe(
      map((user) => ProfileActions.refreshProfileSuccess(user)),
      catchError((error) => of(ProfileActions.refreshProfileFailure(error)))
    ))
  ),

  updateProfile: (action$, state$) => action$.pipe(
    ofType(ProfileActions.updateProfile),
    filter(() => AuthSelectors.isAuthenticated(state$.value)),
    exhaustMap((action) => profileService.updateProfile(action.payload).pipe(
      map((user) => ProfileActions.updateProfileSuccess(user)),
      catchError((error) => of(ProfileActions.updateProfileFailure(error)))
    ))
  )
};
