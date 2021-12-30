import { baseListedEntityEpics } from '@shared/base-listed-entity-store/store/epics';
import { userService } from '@shared/user/service';
import { Epics } from '@store/types';
import { homeScreenActions } from './actions';
import { homeScreenSelectors } from './selectors';

export const homeScreenEpics: Epics = {
  ...baseListedEntityEpics(homeScreenActions, homeScreenSelectors, userService)
};
