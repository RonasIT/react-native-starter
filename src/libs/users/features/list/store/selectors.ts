import { BaseListedEntitySelectors } from '@libs/shared/data-access/base-listed-entity-store';
import { AppState } from '@libs/shared/data-access/store';
import { UsersListState } from './reducer';

const selectFeature = (state: AppState): UsersListState => state.usersList;

class UsersListSelectors extends BaseListedEntitySelectors {
  constructor() {
    super(
      selectFeature,
      'user'
    );
  }
}

export const usersListSelectors = new UsersListSelectors();
