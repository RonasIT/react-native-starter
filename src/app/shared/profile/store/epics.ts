import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, withLatestFrom } from 'rxjs/operators';
import { AuthActions } from '@shared/auth/store/actions';
import { AuthSelectors } from '@shared/auth/store/selectors';
import { Epics } from '@store/types';
import { profileService } from '../service';
import { ProfileActions } from './actions';

export const profileEpics: Epics = {
  tokenLoaded: (action$, state$) => action$.pipe(
    filter(AuthActions.tokenLoaded.match),
    withLatestFrom(state$),
    filter(([_, state]) => AuthSelectors.isAuthenticated(state)),
    map(() => ProfileActions.refreshProfile())
  ),

  saveToken: (action$) => action$.pipe(
    filter(AuthActions.saveToken.match),
    map(() => ProfileActions.refreshProfile())
  ),

  unauthorize: (action$) => action$.pipe(
    filter(AuthActions.unauthorize.match),
    map(() => ProfileActions.clearProfile())
  ),

  refreshProfile: (action$, state$) => action$.pipe(
    filter(ProfileActions.refreshProfile.match),
    filter(() => AuthSelectors.isAuthenticated(state$.value)),
    exhaustMap(() => profileService.getDemoProfile().pipe(
      map((user) => ProfileActions.refreshProfileSuccess(user)),
      catchError((error) => of(ProfileActions.refreshProfileFailure(error)))
    ))
  ),

  updateProfile: (action$, state$) => action$.pipe(
    filter(ProfileActions.updateProfile.match),
    filter(() => AuthSelectors.isAuthenticated(state$.value)),
    exhaustMap((action) => profileService.updateProfile(action.payload).pipe(
      map((user) => ProfileActions.updateProfileSuccess(user)),
      catchError((error) => of(ProfileActions.updateProfileFailure(error)))
    ))
  )
};
