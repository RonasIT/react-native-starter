import React, { ReactElement } from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';
import { variables } from '@styles';

export function AppRefreshControl(props: RefreshControlProps): ReactElement {
  return <RefreshControl
    colors={[variables.color.primary]}
    tintColor={variables.color.primary}
    {...props} />;
}
