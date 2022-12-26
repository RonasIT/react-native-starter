import { createStackNavigator } from '@react-navigation/stack';
import React, { ReactElement } from 'react';
import { appFacade } from '@app/facade';
import { useTranslation } from '@shared/i18n';
import { LoginScreen } from './login/screen';
import { PinScreen } from './pin';

export type AccountAccessNavigationParams = {
  Login: undefined;
  Pin: { isPinSet?: boolean };
};

const Stack = createStackNavigator<AccountAccessNavigationParams>();

export function AccountAccessNavigation(): ReactElement {
  const translate = useTranslation('ACCOUNT_ACCESS.NAVIGATION');
  const { isAuthenticated } = appFacade;

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'Pin' : 'Login'}>
      <Stack.Screen
        initialParams={{ isPinSet: isAuthenticated }}
        options={{ headerShown: false }}
        name='Pin'
        component={PinScreen}
      />
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
