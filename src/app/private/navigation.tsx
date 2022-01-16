import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from '@shared/i18n';
import { Icon } from '@shared/icon';
import { AppTabBar } from '@shared/tab-bar';
import { variables } from '@styles';
import React, { ReactElement } from 'react';
import { HomeScreen } from './home/screen';
import { ProfileScreen } from './profile/screen';

export type PrivateNavigationParams = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<PrivateNavigationParams>();

export function PrivateNavigation(): ReactElement {
  const initialRouteName = 'Home';
  const translate = useTranslation('PRIVATE.NAVIGATION');

  return (
    <Tab.Navigator
      tabBar={(props) => <AppTabBar {...props} />}
      initialRouteName={initialRouteName}
      backBehavior='none'>
      <Tab.Screen
        name='Home'
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name='home' stroke={focused ? variables.color.primary : variables.color.white} />
          ),
          headerTitleAlign: 'left',
          title: translate('TEXT_HOME')
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name='Profile'
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name='user' stroke={focused ? variables.color.primary : variables.color.white} />
          ),
          headerTitleAlign: 'left',
          title: translate('TEXT_PROFILE')
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
