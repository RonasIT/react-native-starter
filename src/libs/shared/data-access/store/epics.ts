import { values } from 'lodash';
import { combineEpics, Epic } from 'redux-observable';
import { authEpics } from '@libs/shared/data-access/api/auth/store/epics';
import { profileEpics } from '@libs/shared/data-access/api/profile/store/epics';
import { appStorageEpics } from '@libs/shared/data-access/storage/store';
import { appNavigationEpics } from '@libs/shared/features/navigation/store';

export const rootEpic = combineEpics(
  ...values<Epic>(appStorageEpics),
  ...values<Epic>(profileEpics),
  ...values<Epic>(authEpics),
  ...values<Epic>(appNavigationEpics)
);
