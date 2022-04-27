import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import 'reflect-metadata';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import '@testing-library/jest-native/extend-expect';
import { View } from 'react-native';
import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation');

const reactElementMock = (): React.ReactNode => View;
jest.mock('@shared/svg', () => ({ Svg: reactElementMock }));
jest.mock('@assets/icons', () => ({ Icons: {} }));

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = require('react-native').ScrollView;

  return { KeyboardAwareScrollView };
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
