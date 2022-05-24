import { createStore } from '@store/store';
import React, { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { safeAreaProviderMetrics } from './safe-area-provider-metrics';

const store = createStore();

export function TestRootComponent({ children }: { children: ReactElement }): ReactElement {
  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={safeAreaProviderMetrics}>{children}</SafeAreaProvider>
    </Provider>
  );
}
