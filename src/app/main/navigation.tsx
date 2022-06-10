import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ReactElement } from 'react';
import { Colors } from 'react-native-ui-lib';
import { useTranslation } from '@shared/i18n';
import { Icon } from '@shared/icon';
import { AppTabBar } from '@shared/tab-bar';
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
          tabBarIcon: ({ focused }) => <Icon name='home' stroke={focused ? Colors.primary : Colors.white} />,
          headerTitleAlign: 'left',
          title: translate('TEXT_HOME')
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name='Profile'
        options={{
          tabBarIcon: ({ focused }) => <Icon name='user' stroke={focused ? Colors.primary : Colors.white} />,
          headerTitleAlign: 'left',
          title: translate('TEXT_PROFILE')
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
