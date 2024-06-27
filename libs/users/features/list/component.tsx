import React, { ReactElement } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { userAPI } from '@libs/shared/data-access/api/user/api';
import { User } from '@libs/shared/data-access/api/user/models';
import { useInfiniteQuery } from '@libs/shared/data-access/entity-api/hooks';
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
  const { data, isFetching, fetchNextPage, refetch } = useInfiniteQuery(userAPI, { page: 1, perPage: 10 });

  const renderItem = ({ item }: ListRenderItemInfo<User>): ReactElement => <Item user={item} onPress={onItemPress} />;

  return (
    <ItemsList<User>
      onEndReachedThreshold={0.5}
      data={data}
      renderItem={renderItem}
      isLoading={isFetching}
      onEndReached={() => fetchNextPage()}
      onRefresh={refetch}
      ListHeaderComponent={
        <AppButton
          label={translate('BUTTON_CREATE_USER')}
          onPress={onCreateButtonPress}
          style={style.createUserButton}
          testID='create-user-button'
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
