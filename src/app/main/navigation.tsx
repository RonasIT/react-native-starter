import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ReactElement } from 'react';
import { colors } from '../../libs/shared/ui/styles';
import { Icon } from '../../libs/shared/ui/ui-kit/icon';
import { AppTabBar } from '../../libs/shared/ui/ui-kit/tab-bar';
import { useTranslation } from '../../libs/shared/utils/i18n';
import { HomeScreen } from './home/screen';
import { ProfileScreen } from './profile/screen';

export type MainNavigationParams = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainNavigationParams>();

export function MainNavigation(): ReactElement {
  const initialRouteName = 'Home';
  const translate = useTranslation('MAIN.NAVIGATION');

  return (
    <Tab.Navigator
      tabBar={(props) => <AppTabBar {...props} />}
      initialRouteName={initialRouteName}
      backBehavior='none'>
      <Tab.Screen
        name='Home'
        options={{
          tabBarIcon: ({ focused }) => <Icon name='home' stroke={focused ? colors.primary : colors.white} />,
          headerTitleAlign: 'left',
          title: translate('TEXT_HOME')
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name='Profile'
        options={{
          tabBarIcon: ({ focused }) => <Icon name='user' stroke={focused ? colors.primary : colors.white} />,
          headerTitleAlign: 'left',
          title: translate('TEXT_PROFILE')
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
