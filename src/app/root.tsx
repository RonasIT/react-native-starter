import 'reflect-metadata';
import { registerRootComponent } from 'expo';
import * as Clipboard from 'expo-clipboard';
import { useFonts } from 'expo-font';
import React, { ReactElement, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Home = (): ReactElement => {
  const [token, setToken] = useState('');
  const { authorize, clearSession, user, getCredentials } = useAuth0();

  const handleCopyToken = async (): Promise<void> => {
    await Clipboard.setStringAsync(token);
  };

  const onLogin = async (): Promise<void> => {
    try {
      await authorize({ scope: 'openid profile email' });
      const { idToken } = await getCredentials();
      setToken(idToken);
    } catch (e) {
      console.log(e);
    }
  };

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async (): Promise<void> => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  return (
    <View style={styles.container}>
      {!!token && <Button onPress={handleCopyToken} title='Copy idu token' />}
      <Text style={styles.header}> Auth0Sample - Login </Text>
      {user && <Text>You are logged in as {user.name}</Text>}
      {!user && <Text>You are not logged in</Text>}
      <Button onPress={loggedIn ? onLogout : onLogin} title={loggedIn ? 'Log Out' : 'Log In'} />
    </View>
  );
};

export default function Root(): ReactElement {
  const [areFontsReady] = useFonts({
    SFProDisplayBold: require('@assets/fonts/SF-Pro-Display-Bold.otf'),
    SFProDisplayRegular: require('@assets/fonts/SF-Pro-Display-Regular.otf'),
    SFProTextRegular: require('@assets/fonts/SF-Pro-Text-Regular.otf'),
    SFProTextSemiBold: require('@assets/fonts/SF-Pro-Text-Semibold.otf')
  });

  if (!areFontsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Auth0Provider domain={'dev-qpqu0fmdg4ta1x4l.us.auth0.com'} clientId={'sb8YSkPOq0urwCtzRqG82m1fpj2cc2fb'}>
        <Home />
      </Auth0Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

registerRootComponent(Root);
