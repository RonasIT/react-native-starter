import 'reflect-metadata';

import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import React, { ReactElement, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { AppActions } from '@libs/shared/data-access/store';
import { createStore } from '@libs/shared/data-access/store/store';
import { setLanguage } from '@libs/shared/features/i18n';
import { navigationTheme } from '@libs/shared/features/navigation';
import { fonts } from '@libs/shared/ui/ui-kit/assets/fonts';

const store = createStore();

const useLanguage = setLanguage(
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
  const dispatch = useDispatch();
  useLanguage('en');

  useEffect(() => {
    dispatch(AppActions.init());
  }, []);

  return (
    <ThemeProvider value={navigationTheme}>
      <Slot />
    </ThemeProvider>
  );
}

export default function RootLayout(): ReactElement | null {
  // TODO: Uncomment this to use Sentry or remove
  // if (sentryConfig.enabled) {
  //   Sentry.init(sentryConfig);
  // }

  const [areFontsReady] = useFonts(fonts);

  if (!areFontsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
