import React, { ReactElement } from 'react';
import { AppScreen } from '../../../libs/shared/ui/ui-kit/screen';
import { UsersList } from '../../../libs/users/list';

export function HomeScreen(): ReactElement {
  return (
    <AppScreen testID='home-screen'>
      <UsersList />
    </AppScreen>
  );
}
