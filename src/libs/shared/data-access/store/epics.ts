import { values } from 'lodash';
import { combineEpics, Epic } from 'redux-observable';
import { homeScreenEpics } from '@app/main/home/shared/store/epics';
import { appNavigationEpics } from '../../features/navigation/store/epics';
import { authEpics } from '../auth/store/epics';
import { profileEpics } from '../profile/store/epics';
import { appStorageEpics } from '../storage/store';

export const rootEpic = combineEpics(
  ...values<Epic>(appStorageEpics),
  ...values<Epic>(profileEpics),
  ...values<Epic>(authEpics),
  ...values<Epic>(appNavigationEpics),
  ...values<Epic>(homeScreenEpics)
);
