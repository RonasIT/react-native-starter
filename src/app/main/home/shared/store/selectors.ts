import { BaseListedEntitySelectors } from '../../../../../libs/shared/data-access/base-listed-entity-store';
import { AppState } from '../../../../../libs/shared/data-access/store';
import { HomeScreenState } from './reducer';

const selectFeature = (state: AppState): HomeScreenState => state.homeScreen;

class HomeScreenSelectors extends BaseListedEntitySelectors {
  constructor() {
    super(
      selectFeature,
      'user'
    );
  }
}

export const homeScreenSelectors = new HomeScreenSelectors();
