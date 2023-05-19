import React, { ReactElement, useEffect } from 'react';
import { User } from '@libs/shared/data-access/user';
import { ItemsList } from '@libs/shared/features/items-list';
import { commonStyle } from '@libs/shared/ui/styles';
import { UsersListItem } from '@libs/users/features/list-item';
import { usersListFacade } from './facade';

export function UsersList(): ReactElement {
  const { items, isLoading, isRefreshing, pagination } = usersListFacade;
  const refreshItems = (): void => usersListFacade.refreshItems();
  const loadMore = (): void => usersListFacade.loadItems(pagination.currentPage + 1);

  useEffect(() => {
    usersListFacade.loadItems();
  }, []);

  return (
    <ItemsList<User>
      data={items}
      renderItem={UsersListItem}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      canLoadMore={pagination.currentPage < pagination.lastPage}
      onEndReached={loadMore}
      onRefresh={refreshItems}
      containerStyle={commonStyle.container}
      numColumns={1}
      testID='users-list'
    />
  );
}
