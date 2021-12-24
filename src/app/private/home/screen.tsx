import { AppScreen } from '@shared/screen';
import { AppText } from '@shared/text';
import React, { ReactElement } from 'react';

export function HomeScreen(): ReactElement {
  return (
    <AppScreen>
      <AppText>Tab One</AppText>
    </AppScreen>
  );
}
