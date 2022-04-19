import { homeScreenActions, homeScreenSelectors, HomeScreenState } from '@app/main/home/shared/store';
import { BaseListedEntityFacade } from '@shared/base-listed-entity-store/facade';
import { User } from '@shared/user';
import { store } from '@store/store';

class HomeScreenFacade extends BaseListedEntityFacade<
  HomeScreenState,
  User,
  typeof homeScreenActions,
  typeof homeScreenSelectors
> {
  constructor() {
    super(store, homeScreenActions, homeScreenSelectors);
  }
}

export const homeScreenFacade = new HomeScreenFacade();
