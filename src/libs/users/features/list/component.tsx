import { AnyAction } from '@reduxjs/toolkit';
import { last } from 'lodash';
import React, { ReactElement, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDispatch } from 'react-redux';
import { userApi } from '@libs/shared/data-access/api/user/api';
import { User } from '@libs/shared/data-access/api/user/models';
import { PaginationRequest } from '@libs/shared/data-access/entity-api';
import { useTranslation } from '@libs/shared/features/i18n';
import { ItemsList } from '@libs/shared/features/items-list';
import { commonStyle, createStyles } from '@libs/shared/ui/styles';
import { AppButton } from '@libs/shared/ui/ui-kit/button';
import { Item } from './components';

interface UsersListProps {
  onCreateButtonPress: () => void;
  onItemPress: (userID: number) => void;
}

export function UsersList({ onCreateButtonPress, onItemPress }: UsersListProps): ReactElement {
  const translate = useTranslation('USERS.LIST');
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

  const renderItem = ({ item }: ListRenderItemInfo<User>): ReactElement => <Item user={item} onPress={onItemPress} />;

  return (
    <ItemsList<User>
      data={items}
      renderItem={renderItem}
      isLoading={areUsersLoading}
      canLoadMore={last(data)?.currentPage < last(data)?.lastPage}
      onEndReached={loadMore}
      onRefresh={refreshItems}
      ListHeaderComponent={
        <AppButton
          label={translate('BUTTON_CREATE_USER')}
          onPress={onCreateButtonPress}
          style={style.createUserButton}
        />
      }
      containerStyle={commonStyle.container}
      numColumns={1}
      testID='users-list'
    />
  );
}

const style = createStyles({
  createUserButton: {
    marginBottom: '1rem'
  }
});
