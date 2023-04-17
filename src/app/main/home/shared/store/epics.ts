import { baseListedEntityEpics } from '../../../../../libs/shared/data-access/base-listed-entity-store';
import { Epics } from '../../../../../libs/shared/data-access/store/types';
import { userService } from '../../../../../libs/shared/data-access/user';
import { homeScreenActions } from './actions';
import { homeScreenSelectors } from './selectors';

export const homeScreenEpics: Epics = {
  ...baseListedEntityEpics(homeScreenActions, homeScreenSelectors, userService)
};
