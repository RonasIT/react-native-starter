import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { AppText } from '@shared/text';
import { User } from '@shared/user';
import { colors, createStyles } from '@styles';

export function HomeListItem({ item }: { item: User }): ReactElement {
  return (
    <View style={style.itemContainer} testID='user-item'>
      <AppText variant='larger' numberOfLines={1}>
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
    borderBottomColor: colors.white
  }
});
