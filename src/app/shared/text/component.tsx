import React, { ReactElement } from 'react';
import { Text, TextProps } from 'react-native';
import { createStyles, variables } from '@styles';
import { TextTheme } from './enums';

interface Props extends TextProps {
  children?: React.ReactNode;
  theme?: TextTheme;
}

export function AppText({ style: elementStyle = {}, theme, children, ...restProps }: Props): ReactElement {
  return (
    <Text style={[appTextStyle.text, theme && appTextStyle[theme], elementStyle]} {...restProps}>
      {children}
    </Text>
  );
}

export const appTextStyle = createStyles({
  text: {
    fontSize: variables.fontSize.small,
    color: variables.color.white,
    fontFamily: variables.fontFamily.sfProTextRegular,
    lineHeight: '1.84rem'
  },
  textSmallest: {
    fontSize: variables.fontSize.smallest,
    lineHeight: '1.38rem'
  },
  textSmall: {
    fontSize: variables.fontSize.small
  },
  textMedium: {
    fontSize: variables.fontSize.medium,
    lineHeight: '1.54rem'
  },
  textLarger: {
    fontSize: variables.fontSize.larger,
    lineHeight: '1.54rem',
    fontFamily: variables.fontFamily.sfProDisplayRegular
  },
  textLarge: {
    fontSize: variables.fontSize.large,
    fontFamily: variables.fontFamily.sfProDisplayBold,
    lineHeight: '2.46rem'
  },
  textLargest: {
    fontSize: variables.fontSize.largest,
    fontFamily: variables.fontFamily.sfProDisplayBold,
    lineHeight: '2.46rem'
  }
});
