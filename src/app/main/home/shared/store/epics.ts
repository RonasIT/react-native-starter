import { filter, map } from 'rxjs/operators';
import { userAPI } from '@shared/user/api';
import { Epics } from '@store/types';
import { HomeScreenActions } from './actions';

export const homeScreenEpics: Epics = {
  loadItemsSuccess: (action$) => action$.pipe(
    filter(userAPI.endpoints.search.matchFulfilled),
    map(({ payload }) => HomeScreenActions.loadItemsSuccess(payload))
  )
};
