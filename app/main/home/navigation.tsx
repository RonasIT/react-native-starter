import { createStackNavigator } from '@react-navigation/stack';
import React, { ReactElement } from 'react';
import { HomeScreen } from './screen';
import { UserScreen } from './user/screen';

export type HomeNavigationParams = {
  Home: undefined;
  User: { id?: number };
};

const Stack = createStackNavigator<HomeNavigationParams>();

export function HomeNavigation(): ReactElement {
  const initialRouteName = 'Home';

  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='User' component={UserScreen} />
    </Stack.Navigator>
  );
}
