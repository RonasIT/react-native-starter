import React, { ReactElement, useEffect } from 'react';
import { homeScreenFacade } from '@app/main/home/facade';
import { User } from '@shared/user';
import { commonStyle } from '../../../libs/shared/ui/styles';
import { ItemsList } from '../../../libs/shared/ui/ui-kit/items-list';
import { AppScreen } from '../../../libs/shared/ui/ui-kit/screen';
import { HomeListItem } from './shared/components';

export function HomeScreen(): ReactElement {
  const { items, isLoading, isRefreshing, pagination } = homeScreenFacade;
  const refreshItems = (): void => homeScreenFacade.refreshItems();
  const loadMore = (): void => homeScreenFacade.loadItems(pagination.currentPage + 1);

  useEffect(() => {
    homeScreenFacade.loadItems();
  }, []);

  return (
    <AppScreen testID='home-screen'>
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
        testID='users-list'
      />
    </AppScreen>
  );
}
