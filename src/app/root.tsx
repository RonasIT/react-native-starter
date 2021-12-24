import { appConfig } from './constants';
import { store } from '@store';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import React, { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import * as Sentry from 'sentry-expo';
import { App } from './app';

export default function Root(): ReactElement {
  Sentry.init({
    dsn: appConfig.sentry.dsn,
    enableInExpoDevelopment: false,
    debug: !appConfig.production
  });

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
      <Provider store={store}>
        <App />
      </Provider>
    </SafeAreaProvider>
  );
}

registerRootComponent(Root);
