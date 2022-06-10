import React, { ReactElement } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export function AppActivityIndicator(props: ActivityIndicatorProps): ReactElement {
  return <ActivityIndicator
    size='large'
    color={Colors.white}
    {...props} />;
}
