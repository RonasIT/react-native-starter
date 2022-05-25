import React, { ReactElement } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { variables } from '@styles';

export function AppActivityIndicator(props: ActivityIndicatorProps): ReactElement {
  return <ActivityIndicator
    size='large'
    color={variables.color.white}
    {...props} />;
}
