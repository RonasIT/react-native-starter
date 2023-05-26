import { AnyAction } from '@reduxjs/toolkit';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AuthActions } from '@libs/shared/data-access/api/auth/store/actions';
import { profileAPI } from '@libs/shared/data-access/api/profile/api';
import { Epics } from '@libs/shared/data-access/store/types';

export const profileEpics: Epics = {
  refreshOnSaveToken: (action$, state$) => action$.pipe(
    filter(AuthActions.saveToken.match),
    withLatestFrom(state$),
    filter(([_, state]) => !profileAPI.endpoints.getDemo.select()(state).data),
    map(() => profileAPI.endpoints.getDemo.initiate() as unknown as AnyAction)
  ),

  unauthorize: (action$) => action$.pipe(
    filter(AuthActions.unauthorize.match),
    map(() => profileAPI.util.resetApiState())
  )
};
