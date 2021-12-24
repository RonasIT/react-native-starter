import { DefaultTheme, Theme } from '@react-navigation/native';
import { variables } from '@styles';

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: variables.color.white,
    primary: variables.color.background,
    card: variables.color.background,
    border: variables.color.background,
    background: variables.color.background
  }
};
