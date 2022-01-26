import { createStackNavigator } from '@react-navigation/stack';
import I18n from 'i18n-js';
import React, { ReactElement } from 'react';
import { LoginScreen } from './login/screen';

export type PublicNavigationParams = {
  Login: undefined;
};

const Stack = createStackNavigator<PublicNavigationParams>();

export function PublicNavigation(): ReactElement {
  const initialRouteName = 'Login';

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          headerTitleAlign: 'left',
          title: I18n.t('PUBLIC.NAVIGATION.TEXT_LOG_IN')
        }}
      />
    </Stack.Navigator>
  );
}
