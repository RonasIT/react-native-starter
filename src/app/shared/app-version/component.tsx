import Constants from 'expo-constants';
import React, { ReactElement } from 'react';
import { Platform, TextStyle } from 'react-native';
import { Typography } from 'react-native-ui-lib';
import { AppText } from '@shared/text';
import { createStyles } from '@styles';

export function AppVersion(props: { style?: TextStyle }): ReactElement {
  const versionName = `v${Constants.manifest.version} (${Platform.select({
    ios: Constants.manifest.ios?.buildNumber,
    android: String(Constants.manifest.android?.versionCode)
  })})`;

  return <AppText style={[style.versionText, props.style]}>{versionName}</AppText>;
}

const style = createStyles({
  versionText: {
    width: '100%',
    textAlign: 'right',
    fontSize: Typography.smallest.fontSize
  }
});
