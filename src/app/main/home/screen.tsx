import { AppScreen } from '@shared/screen';
import React, { ReactElement } from 'react';
import { userAPI } from '@shared/user/api';
import { AppText } from '@shared/text';

export function HomeScreen(): ReactElement {
  const { useSearchQuery } = userAPI;
  const { data, isLoading, error } = useSearchQuery({ page: 1 });

  return (
    <AppScreen testID='home-screen'>
      <AppText>Home</AppText>
    </AppScreen>
  );
}
