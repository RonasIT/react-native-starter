import { useScrollToTop } from '@react-navigation/native';
import { noop } from 'lodash';
import React, { ReactElement, useCallback, useRef } from 'react';
import { FlatList, FlatListProps, ViewStyle } from 'react-native';
import { BaseEntity } from '@libs/shared/data-access/entity-api';
import { ItemsListEmptyState } from '@libs/shared/features/items-list-empty-state';
import { colors, createStyles } from '@libs/shared/ui/styles';
import { AppActivityIndicator } from '@libs/shared/ui/ui-kit/activity-indicator';
import { AppRefreshControl } from '@libs/shared/ui/ui-kit/refresh-control';

export interface ItemsListProps<T> extends FlatListProps<T> {
  isLoading?: boolean;
  isRefreshing?: boolean;
  canLoadMore?: boolean;
  onRefresh?: () => void;
  containerStyle?: ViewStyle;
  testID?: string;
}

const defaultKeyExtractor = <T extends BaseEntity>(item: T): string => String(item.id);

export function ItemsList<T extends BaseEntity>({
  data,
  isLoading,
  isRefreshing = false,
  canLoadMore,
  ListEmptyComponent = <ItemsListEmptyState />,
  keyExtractor,
  onEndReached = noop,
  onRefresh = noop,
  containerStyle,
  testID,
  ...restProps
}: ItemsListProps<T>): ReactElement {
  const scrollableViewRef = useRef(null);
  const listKeyExtractor = useCallback(keyExtractor || defaultKeyExtractor, [keyExtractor]);

  const listEndReached = (): void => {
    if (canLoadMore && !isLoading) {
      onEndReached(null);
    }
  };

  useScrollToTop(scrollableViewRef);

  return (
    <FlatList
      ref={scrollableViewRef}
      data={data}
      contentContainerStyle={[style.itemsList, containerStyle]}
      ListEmptyComponent={!isLoading && ListEmptyComponent}
      ListFooterComponent={
        isLoading && <AppActivityIndicator
          size={'large'}
          style={style.activityIndicator}
          color={colors.primary} />
      }
      onEndReached={listEndReached}
      refreshControl={<AppRefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />}
      keyExtractor={listKeyExtractor}
      testID={testID}
      {...restProps}
    />
  );
}

const style = createStyles({
  itemsList: {
    minHeight: '100%',
    paddingBottom: 50
  },
  activityIndicator: {
    marginVertical: '1rem'
  }
});
