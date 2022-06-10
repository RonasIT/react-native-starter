import React, { ReactElement } from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export function AppRefreshControl(props: RefreshControlProps): ReactElement {
  return <RefreshControl
    colors={[Colors.primary]}
    tintColor={Colors.primary}
    {...props} />;
}
