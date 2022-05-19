import { AppScreen } from '@shared/screen';
import React, { ReactElement, useState } from 'react';
import { userAPI } from '@shared/user/api';
import { ItemsList } from '@shared/items-list';
import { HomeListItem } from './shared/components';
import { User } from '@shared/user';
import { commonStyle } from '@styles';
import { AppButton } from '@shared/button';

export function HomeScreen(): ReactElement {
  const [page, setPage] = useState(1);
  const { useSearchQuery } = userAPI;
  const { data, isLoading } = useSearchQuery({ page });

  const refreshItems = (): void => setPage(1);
  const loadMore = (): void => setPage(page + 1);

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
        ListHeaderComponent={<AppButton title='Next' onPress={loadMore} />}
      />
    </AppScreen>
  );
}
