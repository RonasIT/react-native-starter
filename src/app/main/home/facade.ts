import { homeScreenActions, homeScreenSelectors, HomeScreenState } from '@app/main/home/shared/store';
import { BaseListedEntityFacade } from '@shared/base-listed-entity-store/facade';
import { User } from '@shared/user';
import { storeRef } from '@store';

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
