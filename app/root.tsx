import 'reflect-metadata';
import 'expo-dev-client';
import { useFonts } from 'expo-font';
import React, { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { createStore } from '@libs/shared/data-access/store/store';
import { fonts } from '@libs/shared/ui/ui-kit/assets/fonts';
import { App } from './app';

const store = createStore();

export default function Root(): ReactElement {
  // TODO: Uncomment this to use Sentry or remove
  // if (sentryConfig.enabled) {
  //   Sentry.init(sentryConfig);
  // }

  const [areFontsReady] = useFonts(fonts);

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
