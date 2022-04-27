import { AppText, TextTheme } from '@shared/text';
import { User } from '@shared/user';
import { createStyles, variables } from '@styles';
import React, { ReactElement } from 'react';
import { View } from 'react-native';

export function HomeListItem({ item }: { item: User }): ReactElement {
  return (
    <View style={style.itemContainer} testID='user-item'>
      <AppText theme={TextTheme.LARGER} numberOfLines={1}>
        #{item.id}: {item.name}
      </AppText>
      <AppText numberOfLines={1}>Email: {item.email}</AppText>
    </View>
  );
}

const style = createStyles({
  itemContainer: {
    paddingVertical: '0.5rem',
    borderBottomWidth: 2,
    borderBottomColor: variables.color.white
  }
});
