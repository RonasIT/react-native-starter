import { BaseListedEntityActions } from '@shared/base-listed-entity-store/store/actions';
import { HomeScreenState } from './state';

class HomeScreenActions extends BaseListedEntityActions<HomeScreenState> {
  constructor() {
    super(
      'Home Screen',
      'user'
    );
  }
}

export const homeScreenActions = new HomeScreenActions();
