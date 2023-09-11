import 'reflect-metadata';

import { Stack } from 'expo-router/stack';
import React, { ReactElement } from 'react';
import { useTranslation } from '@libs/shared/features/i18n';

export default function AuthLayout(): ReactElement {
  const translate = useTranslation('APP.AUTH_LAYOUT');

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitleAlign: 'left',
          title: translate('TEXT_LOG_IN')
        }}
      />
    </Stack>
  );
}
