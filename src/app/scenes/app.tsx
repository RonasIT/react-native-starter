import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { ReactElement, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AccountAccessNavigation } from '@app/scenes/account-access/navigation';
import { useLanguage } from '@libs/shared/features/i18n';
import { authenticatedScreenListeners, navigationRef, navigationTheme } from '@libs/shared/features/navigation';
import { colors } from '@libs/shared/ui/styles';
import { AppActivityIndicator } from '@libs/shared/ui/ui-kit/activity-indicator';
import { appLinking } from '../linking';
import { appFacade } from './facade';
import { MainNavigation } from './main/navigation';

const Stack = createStackNavigator();
const setLanguage = useLanguage(
  {
    en: {
      ...require('@assets/i18n/en.json'),
      ...require('../../libs/auth/assets/i18n/en.json'),
      ...require('../../libs/profile/assets/i18n/en.json'),
      ...require('../../libs/shared/assets/i18n/en.json'),
      ...require('../../libs/users/assets/i18n/en.json')
    }
  },
  'en'
);

export function App(): ReactElement {
  const { isTokenLoaded, isAuthenticated } = appFacade;
  const statusBarHeight = useSafeAreaInsets().top;
  setLanguage('en');

  useEffect(() => {
    appFacade.init();
  }, []);

  return (
    <SafeAreaView style={style.screen}>
      <NavigationContainer
        linking={appLinking}
        theme={navigationTheme}
        ref={navigationRef}>
        <View style={{ height: statusBarHeight, marginTop: -statusBarHeight * 2 }}>
          <StatusBar
            translucent={true}
            backgroundColor='transparent'
            style='light' />
        </View>
        {isTokenLoaded ? (
          <Stack.Navigator
            initialRouteName={isAuthenticated ? 'Main' : 'AccountAccess'}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name='AccountAccess' component={AccountAccessNavigation} />
            <Stack.Screen
              name='Main'
              component={MainNavigation}
              listeners={authenticatedScreenListeners} />
          </Stack.Navigator>
        ) : (
          <AppActivityIndicator />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  }
});
