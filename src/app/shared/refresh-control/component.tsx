import { variables } from '@styles';
import { RefreshControl, RefreshControlProps } from 'react-native';
import React, { ReactElement } from 'react';

export function AppRefreshControl(props: RefreshControlProps): ReactElement {
  return <RefreshControl
    colors={[variables.color.primary]}
    tintColor={variables.color.primary}
    {...props} />;
}
