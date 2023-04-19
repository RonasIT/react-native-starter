import React, { ReactElement } from 'react';
import { UsersList } from '@libs/users/features/list';
import { AppScreen } from '@shared/ui/ui-kit/screen';

export function HomeScreen(): ReactElement {
  return (
    <AppScreen testID='home-screen'>
      <UsersList />
    </AppScreen>
  );
}
