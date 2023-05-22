import { values } from 'lodash';
import { combineEpics, Epic } from 'redux-observable';
import { appNavigationEpics } from '@libs/shared/features/navigation/store/epics';
import { usersListEpics } from '@libs/users/features/list/store/epics';
import { authEpics } from '../auth/store/epics';
import { profileEpics } from '../profile/store/epics';
import { appStorageEpics } from '../storage/store';

export const rootEpic = combineEpics(
  ...values<Epic>(appStorageEpics),
  ...values<Epic>(profileEpics),
  ...values<Epic>(authEpics),
  ...values<Epic>(appNavigationEpics),
  ...values<Epic>(usersListEpics)
);
