import { homeScreenActions, homeScreenSelectors, HomeScreenState } from '@app/main/home/shared/store';
import { BaseListedEntityFacade } from '../../../libs/shared/data-access/base-listed-entity-store';
import { storeRef } from '../../../libs/shared/data-access/store';
import { User } from '../../../libs/shared/data-access/user';

class HomeScreenFacade extends BaseListedEntityFacade<
  HomeScreenState,
  User,
  typeof homeScreenActions,
  typeof homeScreenSelectors
> {
  constructor() {
    super(storeRef, homeScreenActions, homeScreenSelectors);
  }
}

export const homeScreenFacade = new HomeScreenFacade();
