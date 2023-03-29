import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { last } from 'lodash';
import React, { ReactElement, useState } from 'react';
import { AppButton } from '@shared/button';
import { useTranslation } from '@shared/i18n';
import { ItemsList } from '@shared/items-list';
import { appNavigationService } from '@shared/navigation';
import { AppScreen } from '@shared/screen';
import { User, userPromiseService } from '@shared/user';
import { commonStyle, createStyles } from '@styles';
import { HomeListItem } from './shared/components';

export function HomeScreen(): ReactElement {
  const translate = useTranslation('MAIN.HOME');
  const [isRefetching, setIsRefetching] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => userPromiseService.search({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.currentPage + 1,
    onSuccess: (data) => {
      const lastPage = last(data.pages);
      for (const item of lastPage.data) {
        queryClient.setQueryData(['user', item.id], item);
      }
    }
  });

  const items = data?.pages.flatMap((response) => response.data);

  const refetchItems = async (): Promise<void> => {
    setIsRefetching(true);
    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };

  const navigateToUser = (): void => appNavigationService.navigate('User');

  return (
    <AppScreen testID='home-screen'>
      <ItemsList<User>
        data={items}
        renderItem={HomeListItem}
        isLoading={isLoading || isFetchingNextPage}
        isRefreshing={isRefetching}
        canLoadMore={hasNextPage}
        onEndReached={() => fetchNextPage()}
        onRefresh={refetchItems}
        ListHeaderComponent={
          <AppButton
            label={translate('TEXT_CREATE_USER')}
            onPress={navigateToUser}
            style={style.createUserButton} />
        }
        containerStyle={commonStyle.container}
        numColumns={1}
        testID='users-list'
      />
    </AppScreen>
  );
}

const style = createStyles({
  createUserButton: {
    marginBottom: '1rem'
  }
});
