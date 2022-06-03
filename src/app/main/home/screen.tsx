import React, { ReactElement, useState } from 'react';
import { AppButton } from '@shared/button';
import { ItemsList } from '@shared/items-list';
import { appNavigationService } from '@shared/navigation';
import { AppScreen } from '@shared/screen';
import { userAPI } from '@shared/user/api';
import { commonStyle } from '@styles';
import { homeScreenFacade } from './facade';
import { HomeListItem } from './shared/components';

export function HomeScreen(): ReactElement {
  const [page, setPage] = useState(1);
  const { useSearchQuery } = userAPI;
  const { isLoading } = useSearchQuery({ page });
  const { itemsIDs, pagination } = homeScreenFacade;

  const refreshItems = (): void => setPage(1);
  const loadMore = (): void => setPage(page + 1);

  const navigateToUser = (): void => appNavigationService.navigate('User');

  return (
    <AppScreen testID='home-screen'>
      <ItemsList
        data={itemsIDs}
        renderItem={({ item }) => <HomeListItem userID={item} />}
        isLoading={isLoading}
        canLoadMore={pagination.currentPage < pagination.lastPage}
        onEndReached={loadMore}
        onRefresh={refreshItems}
        containerStyle={commonStyle.container}
        numColumns={1}
        testID='users-list'
        ListHeaderComponent={<AppButton title='New user' onPress={navigateToUser} />}
      />
    </AppScreen>
  );
}
