import { filter, map, tap } from 'rxjs/operators';
import { appNavigationService } from '@shared/navigation';
import { userAPI } from '@shared/user/api';
import { AppActions } from '@store/actions';
import { Epics } from '@store/types';

export const userScreenEpics: Epics = {
  deleteUserSuccess: (action$) => action$.pipe(
    filter(userAPI.endpoints.delete.matchFulfilled),
    tap(() => {
      appNavigationService.goBack();
    }),
    map(() => AppActions.noop())
  )
};
