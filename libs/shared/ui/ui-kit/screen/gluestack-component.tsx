import { styled } from '@gluestack-style/react';
import React, { ReactElement } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

const StyledScreen = styled(ScrollView, {
  p: '$x20',
  bg: '$backgroundColor',
  flex: 1
});

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isHeaderLess?: boolean;
  testID?: string;
}

export function GlueStackAppScreen({ children, style, testID }: Props): ReactElement {
  return (
    <StyledScreen contentContainerStyle={style} testID={testID}>
      {children}
    </StyledScreen>
  );
}
