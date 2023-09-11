import { Tabs } from 'expo-router';
import React, { ReactElement } from 'react';
import { useTranslation } from '@libs/shared/features/i18n';
import { colors } from '@libs/shared/ui/styles';
import { Icon } from '@libs/shared/ui/ui-kit/icon';

export default function MainNavigation(): ReactElement {
  const translate = useTranslation('APP.MAIN_LAYOUT');

  return (
    <Tabs backBehavior='none'>
      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: ({ focused }) => <Icon name='home' color={focused ? colors.primary : colors.white} />,
          headerTitleAlign: 'left',
          title: translate('TEXT_HOME')
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: ({ focused }) => <Icon name='user' color={focused ? colors.primary : colors.white} />,
          headerTitleAlign: 'left',
          title: translate('TEXT_PROFILE')
        }}
      />
    </Tabs>
  );
}
