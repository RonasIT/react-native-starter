import React, { ReactElement } from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';
import { colors } from '@shared/ui/styles';

export function AppRefreshControl(props: RefreshControlProps): ReactElement {
  return <RefreshControl
    colors={[colors.primary]}
    tintColor={colors.primary}
    {...props} />;
}
