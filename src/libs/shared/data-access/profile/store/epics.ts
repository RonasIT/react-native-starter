import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, withLatestFrom } from 'rxjs/operators';
import { AuthActions } from '../../auth/store/actions';
import { AuthSelectors } from '../../auth/store/selectors';
import { Epics } from '../../store/types';
import { profileService } from '../service';
import { ProfileActions } from './actions';
import { ProfileSelectors } from './selectors';

export const profileEpics: Epics = {
  refreshOnSaveToken: (action$, state$) => action$.pipe(
    filter(AuthActions.saveToken.match),
    withLatestFrom(state$),
    filter(([_, state]) => !ProfileSelectors.profile(state)),
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
