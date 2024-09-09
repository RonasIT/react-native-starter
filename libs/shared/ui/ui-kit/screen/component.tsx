import React, { ReactElement } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { createStyles } from '@libs/shared/ui/styles';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isHeaderLess?: boolean;
  testID?: string;
}

export function AppScreen({ children, style: elementStyle = {}, testID }: Props): ReactElement {
  return (
    <ScrollView contentContainerStyle={[style.screen, elementStyle]} testID={testID}>
      {children}
    </ScrollView>
  );
}

const style = createStyles({
  screen: {}
});
