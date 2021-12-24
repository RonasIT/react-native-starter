import { createStyles } from '@styles';
import React, { ReactElement } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isHeaderLess?: boolean;
}

export function AppScreen({ children, style: elementStyle = {} }: Props): ReactElement {
  return <View style={[style.screen, elementStyle]}>{children}</View>;
}

const style = createStyles({
  screen: {
    flex: 1
  }
});
