import React, { ReactElement } from 'react';
import { TextProps, Text } from 'react-native-ui-lib';

export function AppText({ children, ...restProps }: TextProps): ReactElement {
  return (
    <Text
      white
      small
      {...restProps}>
      {children}
    </Text>
  );
}
