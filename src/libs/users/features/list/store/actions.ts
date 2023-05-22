import { BaseListedEntityActions } from '@libs/shared/data-access/base-listed-entity-store';
import { UsersListState } from './reducer';

class UsersListActions extends BaseListedEntityActions<UsersListState> {
  constructor() {
    super(
      'Home Screen',
      'user'
    );
  }
}

export const usersListActions = new UsersListActions();
