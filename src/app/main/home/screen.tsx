import React, { ReactElement, useState } from 'react';
import { View } from 'react-native';
import { AppButton } from '@shared/button';
import { ItemsList } from '@shared/items-list';
import { appNavigationService } from '@shared/navigation';
import { AppScreen } from '@shared/screen';
import { User } from '@shared/user';
import { userAPI } from '@shared/user/api';
import { commonStyle } from '@styles';
import { HomeListItem } from './shared/components';

export function HomeScreen(): ReactElement {
  const [page, setPage] = useState(1);
  const { useSearchQuery } = userAPI;
  const { data, isLoading } = useSearchQuery({ page });

  const refreshItems = (): void => setPage(1);
  const loadMore = (): void => setPage(page + 1);

  const navigateToUser = (): void => appNavigationService.navigate('User');

  return (
    <AppScreen testID='home-screen'>
      <ItemsList<User>
        data={data?.data || []}
        renderItem={HomeListItem}
        isLoading={isLoading}
        canLoadMore={data?.currentPage < data?.lastPage}
        containerStyle={commonStyle.container}
        onRefresh={refreshItems}
        numColumns={1}
        testID='users-list'
        ListHeaderComponent={
          <View>
            <AppButton title='New user' onPress={navigateToUser} />
            <AppButton title='Next' onPress={loadMore} />
          </View>
        }
      />
    </AppScreen>
  );
}
