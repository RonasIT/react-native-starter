import { baseListedEntityEpics } from '@libs/shared/data-access/base-listed-entity-store';
import { Epics } from '@libs/shared/data-access/store/types';
import { userService } from '@libs/shared/data-access/user';
import { usersListActions } from './actions';
import { usersListSelectors } from './selectors';

export const usersListEpics: Epics = {
  ...baseListedEntityEpics(usersListActions, usersListSelectors, userService)
};
