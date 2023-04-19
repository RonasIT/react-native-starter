import React, { ReactElement } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { colors } from '@shared/ui/styles';

export function AppActivityIndicator(props: ActivityIndicatorProps): ReactElement {
  return <ActivityIndicator
    size='large'
    color={colors.white}
    {...props} />;
}
