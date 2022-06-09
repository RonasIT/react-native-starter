import React, { ReactElement } from 'react';
import { TextProps } from 'react-native-ui-lib';
import Text from 'react-native-ui-lib/text';

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
