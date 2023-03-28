import { filter, map, tap } from 'rxjs/operators';
import { appNavigationService } from '@shared/navigation/service';
import { AppActions, Epics } from '@store';
import { UserScreenActions } from './actions';

export const userScreenEpics: Epics = {
  userDeleted: (action$) => action$.pipe(
    filter(UserScreenActions.userDeleteSuccess.match),
    tap(() => appNavigationService.goBack()),
    map(() => AppActions.noop())
  )
};
