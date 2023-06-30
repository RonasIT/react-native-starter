import { colors } from '@libs/shared/ui/styles';
import React, { ReactElement } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

export function AppActivityIndicator(props: ActivityIndicatorProps): ReactElement {
  return <ActivityIndicator
    size='large'
    color={colors.white}
    {...props} />;
}
