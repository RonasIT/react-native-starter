import { values } from 'lodash';
import { combineEpics, Epic } from 'redux-observable';
import { homeScreenEpics } from '@app/main/home/shared/store/epics';
import { authEpics } from '@shared/auth/store/epics';
import { localAuthEpics } from '@shared/local-auth';
import { appNavigationEpics } from '@shared/navigation/store/epics';
import { profileEpics } from '@shared/profile/store/epics';
import { appStorageEpics } from '@shared/storage/store';

export const rootEpic = combineEpics(
  ...values<Epic>(appStorageEpics),
  ...values<Epic>(profileEpics),
  ...values<Epic>(authEpics),
  ...values<Epic>(appNavigationEpics),
  ...values<Epic>(homeScreenEpics),
  ...values<Epic>(localAuthEpics)
);
