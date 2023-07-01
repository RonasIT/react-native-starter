import React, { ReactElement } from 'react';
import { appNavigationService } from '@libs/shared/features/navigation';
import { AppScreen } from '@libs/shared/ui/ui-kit/screen';
import { UsersList } from '@libs/users/features/list';

export function HomeScreen(): ReactElement {
  const navigateToUserCreation = (): void => appNavigationService.navigate('User');

  const navigateToUserDetails = (userID: number): void => {
    appNavigationService.navigate('User', { id: userID });
  };

  return (
    <AppScreen testID='home-screen'>
      <UsersList onCreateButtonPress={navigateToUserCreation} onItemPress={navigateToUserDetails} />
    </AppScreen>
  );
}
