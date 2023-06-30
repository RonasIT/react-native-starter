import { colors } from '@libs/shared/ui/styles';
import React, { ReactElement } from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';

export function AppRefreshControl(props: RefreshControlProps): ReactElement {
  return <RefreshControl
    colors={[colors.primary]}
    tintColor={colors.primary}
    {...props} />;
}
