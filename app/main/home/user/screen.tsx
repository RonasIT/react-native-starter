import { appNavigationService } from '@libs/shared/features/navigation';
import { commonStyle } from '@libs/shared/ui/styles';
import { AppScreen } from '@libs/shared/ui/ui-kit/screen';
import { UserDetails } from '@libs/users/features/details';
import { RouteProp } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { HomeNavigationParams } from '../navigation';

export function UserScreen(props: { route: RouteProp<HomeNavigationParams, 'User'> }): ReactElement {
  const id = props.route.params?.id;

  const goBack = (): void => appNavigationService.goBack();

  return (
    <AppScreen style={commonStyle.container}>
      <UserDetails id={id} onSuccessfulDelete={goBack} />
    </AppScreen>
  );
}
