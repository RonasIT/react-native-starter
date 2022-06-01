import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import { appNavigationService } from '@shared/navigation';
import { AppText, TextTheme } from '@shared/text';
import { User } from '@shared/user';
import { createStyles, variables } from '@styles';

export function HomeListItem({ item }: { item: User }): ReactElement {
  function navigateToUser(): void {
    appNavigationService.navigate('User', { id: item.id });
  }

  return (
    <TouchableOpacity
      onPress={navigateToUser}
      style={style.itemContainer}
      testID='user-item'>
      <AppText theme={TextTheme.LARGER} numberOfLines={1}>
        #{item.id}: {item.name}
      </AppText>
      <AppText numberOfLines={1}>Email: {item.email}</AppText>
    </TouchableOpacity>
  );
}

const style = createStyles({
  itemContainer: {
    paddingVertical: '0.5rem',
    borderBottomWidth: 2,
    borderBottomColor: variables.color.white
  }
});
