import { useRouter } from 'expo-router';
import React, { ReactElement } from 'react';
import { AppScreen } from '../../../libs/shared/ui/ui-kit/screen';
import { UsersList } from '../../../libs/users/features/list';

export default function HomeScreen(): ReactElement {
  const router = useRouter();

  const navigateToUserCreation = (): void => router.push('(main)/home/user');

  const navigateToUserDetails = (userID: number): void => {
    router.push({
      pathname: '(main)/home/user',
      params: { id: userID }
    });
  };

  return (
    <AppScreen testID='home-screen'>
      <UsersList onCreateButtonPress={navigateToUserCreation} onItemPress={navigateToUserDetails} />
    </AppScreen>
  );
}
