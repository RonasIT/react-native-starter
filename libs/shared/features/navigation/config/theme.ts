import { colors } from '@libs/shared/ui/styles';
import { DefaultTheme, Theme } from '@react-navigation/native';

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: colors.white,
    primary: colors.background,
    card: colors.background,
    border: colors.background,
    background: colors.background
  }
};
