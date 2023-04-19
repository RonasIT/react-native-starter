import { DefaultTheme, Theme } from '@react-navigation/native';
import { colors } from '@shared/ui/styles';

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
