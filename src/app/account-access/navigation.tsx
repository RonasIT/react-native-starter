import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from '@shared/i18n';
import React, { ReactElement } from 'react';
import { LoginScreen } from './login/screen';

export type AccountAccessNavigationParams = {
  Login: undefined;
};

const Stack = createStackNavigator<AccountAccessNavigationParams>();

export function AccountAccessNavigation(): ReactElement {
  const initialRouteName = 'Login';
  const translate = useTranslation('ACCOUNT_ACCESS.NAVIGATION');

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          headerTitleAlign: 'left',
          title: translate('TEXT_LOG_IN')
        }}
      />
    </Stack.Navigator>
  );
}
