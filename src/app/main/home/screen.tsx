import React, { ReactElement, useState } from 'react';
import { useSearchInfinite } from '@shared/base-entity/hooks';
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

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage, refetch } = useSearchInfinite<User>({
    entityName: 'user',
    entityService: userPromiseService
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

  const loadMore = (): void => {
    fetchNextPage();
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
        onEndReached={loadMore}
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
