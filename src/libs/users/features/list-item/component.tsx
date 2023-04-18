import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { User } from '../../../shared/data-access/user';
import { colors, createStyles } from '../../../shared/ui/styles';
import { AppText } from '../../../shared/ui/ui-kit/text';

export function UsersListItem({ item }: { item: User }): ReactElement {
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
