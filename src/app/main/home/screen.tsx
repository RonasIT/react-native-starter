import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { isUndefined, last, omitBy } from 'lodash';
import React, { ReactElement, useState } from 'react';
import { apiPromiseService } from '@shared/api/promise-service';
import { AppButton } from '@shared/button';
import { useTranslation } from '@shared/i18n';
import { ItemsList } from '@shared/items-list';
import { appNavigationService } from '@shared/navigation';
import { Pagination, PaginationRequest, PaginationResponse } from '@shared/pagination';
import { AppScreen } from '@shared/screen';
import { User } from '@shared/user';
import { commonStyle, createStyles } from '@styles';
import { HomeListItem } from './shared/components';

const searchUsers = async (params: { page?: number }): Promise<PaginationResponse<User>> => {
  const request = new PaginationRequest(omitBy<PaginationRequest>(params, isUndefined));

  const response = await apiPromiseService.get('/users', instanceToPlain<PaginationRequest>(request));
  const { data, ...pagination } = plainToInstance(PaginationResponse, response);

  const responseInstance = {
    ...pagination,
    data: data.map((item) => plainToInstance(User, item))
  } as PaginationResponse<User>;

  const { data: responseInstanceData, ...restResponse } = responseInstance;
  const demoPaginationData = (restResponse as any).meta.pagination;
  const newPagination = new Pagination({
    currentPage: demoPaginationData.page,
    total: demoPaginationData.total,
    perPage: demoPaginationData.limit,
    lastPage: demoPaginationData.pages
  });

  return { data: responseInstanceData, ...newPagination };
};

export function HomeScreen(): ReactElement {
  const translate = useTranslation('MAIN.HOME');
  const [isRefetching, setIsRefetching] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => searchUsers({ page: pageParam }),
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
