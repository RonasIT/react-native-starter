import { PublicNavigation } from '@app/public/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppActivityIndicator } from '@shared/activity-indicator';
import { useLanguage } from '@shared/i18n';
import { authenticatedScreenListeners, navigationRef, navigationTheme } from '@shared/navigation';
import { variables } from '@styles';
import { StatusBar } from 'expo-status-bar';
import React, { ReactElement, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { appFacade } from './facade';
import { appLinking } from './linking';
import { PrivateNavigation } from './private/navigation';

const Stack = createStackNavigator();
const setLanguage = useLanguage(
  {
    en: require('@assets/i18n/en.json')
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
            initialRouteName={isAuthenticated ? 'Private' : 'Public'}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Public' component={PublicNavigation} />
            <Stack.Screen
              name='Private'
              component={PrivateNavigation}
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
    backgroundColor: variables.color.background
  }
});
