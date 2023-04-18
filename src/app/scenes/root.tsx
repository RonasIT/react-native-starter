import 'reflect-metadata';
import { useFonts } from 'expo-font';
import React, { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { createStore } from '../../libs/shared/data-access/store/store';
import { App } from './app';

const store = createStore();

export default function Root(): ReactElement {
  // TODO: Uncomment this to use Sentry or remove
  // if (sentryConfig.enabled) {
  //   Sentry.init(sentryConfig);
  // }

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
