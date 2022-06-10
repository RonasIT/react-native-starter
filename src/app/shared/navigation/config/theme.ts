import { DefaultTheme, Theme } from '@react-navigation/native';
import { Colors } from 'react-native-ui-lib';

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: Colors.white,
    primary: Colors.background,
    card: Colors.background,
    border: Colors.background,
    background: Colors.background
  }
};
