import React, { ReactElement } from 'react';
import { ColorsModifiers, MarginModifiers, Text, TextProps, TypographyModifiers } from 'react-native-ui-lib';
import { colors, typographies } from '@shared/ui/styles';

export type AppTextProps = Omit<
  TextProps,
  keyof TypographyModifiers | keyof ColorsModifiers | keyof MarginModifiers
> & {
  variant?: keyof typeof typographies;
  color?: keyof typeof colors;
};

export function AppText({
  children,
  color = 'white',
  variant = 'small',
  style,
  ...restProps
}: AppTextProps): ReactElement {
  return (
    <Text style={[typographies[variant], { color: colors[color] }, style]} {...restProps}>
      {children}
    </Text>
  );
}
