import { BaseListedEntityFacade } from '@libs/shared/data-access/base-listed-entity-store';
import { storeRef } from '@libs/shared/data-access/store';
import { User } from '@libs/shared/data-access/user';
import { usersListActions, usersListSelectors, UsersListState } from './store';

class UsersListFacade extends BaseListedEntityFacade<
  UsersListState,
  User,
  typeof usersListActions,
  typeof usersListSelectors
> {
  constructor() {
    super(storeRef, usersListActions, usersListSelectors);
  }
}

export const usersListFacade = new UsersListFacade();
