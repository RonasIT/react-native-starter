import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { ReactElement } from 'react';
import { commonStyle } from '@libs/shared/ui/styles';
import { AppScreen } from '@libs/shared/ui/ui-kit/screen';
import { UserDetails } from '@libs/users/features/details';

type UserScreenParams = {
  id: string;
};

export default function UserScreen(): ReactElement {
  const router = useRouter();

  const { id } = useLocalSearchParams<UserScreenParams>();

  const goBack = (): void => router.back();

  return (
    <AppScreen style={commonStyle.container}>
      <UserDetails id={Number(id)} onSuccessfulDelete={goBack} />
    </AppScreen>
  );
}
