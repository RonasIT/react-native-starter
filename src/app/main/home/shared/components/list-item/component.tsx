import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import { appNavigationService } from '@shared/navigation';
import { AppText, TextTheme } from '@shared/text';
import { userAPI } from '@shared/user/api';
import { createStyles, variables } from '@styles';

export function HomeListItem({ userID }: { userID: number }): ReactElement {
  const { useGetQuery } = userAPI;
  const { data } = useGetQuery({ id: userID });

  function navigateToUser(): void {
    appNavigationService.navigate('User', { id: userID });
  }

  return (
    <TouchableOpacity
      onPress={navigateToUser}
      style={style.itemContainer}
      testID='user-item'>
      {data && (
        <>
          <AppText theme={TextTheme.LARGER} numberOfLines={1}>
            #{data.id}: {data.name}
          </AppText>
          <AppText numberOfLines={1}>Email: {data.email}</AppText>
        </>
      )}
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
