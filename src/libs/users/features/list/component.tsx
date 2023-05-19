import { AnyAction } from '@reduxjs/toolkit';
import { last } from 'lodash';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userApi } from '@libs/shared/data-access/api/user/api';
import { User } from '@libs/shared/data-access/api/user/models';
import { PaginationRequest } from '@libs/shared/data-access/entity-api';
import { ItemsList } from '@libs/shared/features/items-list';
import { commonStyle } from '@libs/shared/ui/styles';
import { UsersListItem } from '@libs/users/features/list-item';

export function UsersList(): ReactElement {
  const [searchParams, setSearchParams] = useState<PaginationRequest>({ page: 1 });
  const { data, isFetching, isLoading } = userApi.useSearchInfiniteQuery(searchParams);

  const items = data?.flatMap((response) => response.data) || [];
  const areUsersLoading = isLoading || (isFetching && searchParams.page > 1);

  const dispatch = useDispatch();

  const refreshItems = async (): Promise<void> => {
    for (const response of data) {
      await dispatch(
        userApi.endpoints.searchInfinite.initiate({
          ...searchParams,
          page: response.currentPage
        }) as unknown as AnyAction
      );
    }
  };

  const loadMore = (): void => {
    if (!isFetching && !isLoading) {
      setSearchParams((params) => ({ ...params, page: params.page + 1 }));
    }
  };

  return (
    <ItemsList<User>
      data={items}
      renderItem={UsersListItem}
      isLoading={areUsersLoading}
      canLoadMore={last(data)?.currentPage < last(data)?.lastPage}
      onEndReached={loadMore}
      onRefresh={refreshItems}
      containerStyle={commonStyle.container}
      numColumns={1}
      testID='users-list'
    />
  );
}
