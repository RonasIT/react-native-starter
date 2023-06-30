import { User } from '@libs/shared/data-access/api/user/models';
import { colors, createStyles } from '@libs/shared/ui/styles';
import { AppText } from '@libs/shared/ui/ui-kit/text';
import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

interface ItemProps {
  user: User;
  onPress: (userID: number) => void;
}

export function Item({ user, onPress }: ItemProps): ReactElement {
  const handlePress = (): void => {
    onPress(user.id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={style.itemContainer}
      testID='user-item'>
      <AppText variant='larger' numberOfLines={1}>
        #{user.id}: {user.name}
      </AppText>
      <AppText numberOfLines={1}>Email: {user.email}</AppText>
    </TouchableOpacity>
  );
}

const style = createStyles({
  itemContainer: {
    paddingVertical: '0.5rem',
    borderBottomWidth: 2,
    borderBottomColor: colors.white
  }
});
