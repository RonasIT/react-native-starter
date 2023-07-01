import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { ReactElement, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { AccountAccessNavigation } from '@app/account-access/navigation';
import { AuthSelectors } from '@libs/shared/data-access/api/auth/store';
import { AppActions, AppState } from '@libs/shared/data-access/store';
import { useLanguage } from '@libs/shared/features/i18n';
import { createAuthenticatedScreenListeners, navigationRef, navigationTheme } from '@libs/shared/features/navigation';
import { colors } from '@libs/shared/ui/styles';
import { AppActivityIndicator } from '@libs/shared/ui/ui-kit/activity-indicator';
import { appLinking } from './linking';
import { MainNavigation } from './main/navigation';

const Stack = createStackNavigator();
const setLanguage = useLanguage(
  {
    en: {
      ...require('@i18n/app/en.json'),
      ...require('@i18n/auth/en.json'),
      ...require('@i18n/profile/en.json'),
      ...require('@i18n/shared/en.json'),
      ...require('@i18n/users/en.json')
    }
  },
  'en'
);

export function App(): ReactElement {
  const isTokenLoaded = useSelector(AuthSelectors.isTokenLoaded);
  const isAuthenticated = useSelector(AuthSelectors.isAuthenticated);
  const statusBarHeight = useSafeAreaInsets().top;
  const dispatch = useDispatch();
  const store = useStore<AppState>();
  setLanguage('en');

  useEffect(() => {
    dispatch(AppActions.init());
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
              listeners={createAuthenticatedScreenListeners(store)}
            />
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
