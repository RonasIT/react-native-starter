import { createStyles } from '@libs/shared/ui/styles';
import React, { ReactElement } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isHeaderLess?: boolean;
  testID?: string;
}

export function AppScreen({ children, style: elementStyle = {}, testID }: Props): ReactElement {
  return (
    <View style={[style.screen, elementStyle]} testID={testID}>
      {children}
    </View>
  );
}

const style = createStyles({
  screen: {
    flex: 1
  }
});
