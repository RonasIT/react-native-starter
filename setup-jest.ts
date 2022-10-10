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
