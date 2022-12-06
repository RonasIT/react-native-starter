import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import 'reflect-metadata';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import { MockReactElement } from '@tests/mocks';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation');

jest.mock('@shared/svg', () => ({ Svg: MockReactElement }));
jest.mock('@assets/icons', () => ({ Icons: {} }));

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = require('react-native').ScrollView;

  return { KeyboardAwareScrollView };
});

jest.mock('react-native-safe-area-context', () => {
  const actualContext = jest.requireActual('react-native-safe-area-context');
  const { safeAreaProviderMetrics } = require('@tests/helpers/safe-area-provider-metrics');

  return {
    ...actualContext,
    useSafeAreaInsets: jest.fn().mockReturnValue(safeAreaProviderMetrics.insets)
  };
});

jest.mock('i18n-js', () => {
  return jest.requireActual('i18n-js/dist/require/index');
});

jest.mock('expo-linking', () => {
  const module: typeof import('expo-linking') = {
    ...jest.requireActual('expo-linking'),
    createURL: jest.fn()
  };

  return module;
});

jest.mock('expo-constants', () => {
  const ConstantsModule = jest.requireActual('expo-constants');
  const { default: Constants } = ConstantsModule;

  return {
    ...ConstantsModule,
    __esModule: true,
    default: {
      ...Constants,
      manifest: {
        ...Constants.manifest
      },
      expoConfig: {
        extra: { env: 'development' }
      }
    }
  };
}); //TODO workaround https://github.com/expo/expo/pull/17402#issuecomment-1217663263

jest.mock('expo-linking', () => {
  const module: typeof import('expo-linking') = {
    ...jest.requireActual('expo-linking'),
    createURL: jest.fn()
  };

  return module;
}); //TODO workaround https://github.com/expo/expo/issues/18742#issuecomment-1234290449
