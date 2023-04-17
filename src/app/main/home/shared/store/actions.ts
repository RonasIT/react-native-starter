import { BaseListedEntityActions } from '../../../../../libs/shared/data-access/base-listed-entity-store';
import { HomeScreenState } from './reducer';

class HomeScreenActions extends BaseListedEntityActions<HomeScreenState> {
  constructor() {
    super(
      'Home Screen',
      'user'
    );
  }
}

export const homeScreenActions = new HomeScreenActions();
