import { homeScreenFacade } from '@app/private/home/facade';
import { ItemsList } from '@shared/items-list';
import { AppScreen } from '@shared/screen';
import { User } from '@shared/user';
import { commonStyle } from '@styles';
import React, { ReactElement, useEffect } from 'react';
import { HomeListItem } from './components';

export function HomeScreen(): ReactElement {
  const { items, isLoading, isRefreshing, pagination } = homeScreenFacade;
  const refreshItems = (): void => homeScreenFacade.refreshItems();
  const loadMore = (): void => homeScreenFacade.loadItems(pagination.currentPage + 1);

  useEffect(() => {
    homeScreenFacade.loadItems();
  }, []);

  return (
    <AppScreen>
      <ItemsList<User>
        data={items}
        renderItem={HomeListItem}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        canLoadMore={pagination.currentPage < pagination.lastPage}
        onEndReached={loadMore}
        onRefresh={refreshItems}
        containerStyle={commonStyle.container}
        numColumns={1}
      />
    </AppScreen>
  );
}
