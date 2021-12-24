import { useScrollToTop } from '@react-navigation/native';
import { AppActivityIndicator } from '@shared/activity-indicator';
import { BaseEntity } from '@shared/base-entity/models';
import { ItemsListEmptyState } from '@shared/items-list-empty-state';
import { AppRefreshControl } from '@shared/refresh-control';
import { createStyles, variables } from '@styles';
import { noop } from 'lodash';
import React, { ReactElement, useRef } from 'react';
import { FlatList, FlatListProps, ViewStyle } from 'react-native';

export interface ItemsListProps<T> extends FlatListProps<T> {
  isLoading?: boolean;
  isRefreshing?: boolean;
  canLoadMore?: boolean;
  onRefresh?: () => void;
  containerStyle?: ViewStyle;
}

export function ItemsList<T extends BaseEntity>({
  data,
  isLoading,
  isRefreshing = false,
  canLoadMore,
  ListEmptyComponent = <ItemsListEmptyState />,
  onEndReached = noop,
  onRefresh = noop,
  containerStyle,
  ...restProps
}: ItemsListProps<T>): ReactElement {
  const scrollableViewRef = useRef(null);

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
        isLoading && (
          <AppActivityIndicator
            size={'large'}
            style={style.activityIndicator}
            color={variables.color.primary} />
        )
      }
      onEndReached={listEndReached}
      refreshControl={<AppRefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />}
      keyExtractor={(item) => String(item.id)}
      {...restProps}
    />
  );
}

const style = createStyles({
  itemsList: {
    minHeight: '100%'
  },
  activityIndicator: {
    marginVertical: '1rem'
  }
});
