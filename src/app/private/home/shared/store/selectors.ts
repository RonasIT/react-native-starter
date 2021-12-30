import { BaseListedEntitySelectors } from '@shared/base-listed-entity-store/store';
import { AppState } from '@store';
import { HomeScreenState } from './state';

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
