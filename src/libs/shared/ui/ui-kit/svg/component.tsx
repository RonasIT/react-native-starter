import React, { ReactElement } from 'react';
import { ImageStyle, Platform } from 'react-native';

interface Props {
  width?: number | string;
  height?: number | string;
  style?: ImageStyle;
  fill?: string;
  color?: string;
  stroke?: string;
}

export function Svg(SvgElement?: ReactElement & { default: () => ReactElement }) {
  return function Component(props: Props = {}): ReactElement {
    if (Platform.OS === 'web') {
      return <img
        {...SvgElement.props}
        {...props}
        src={SvgElement}
        alt='' />;
    }

    return <SvgElement.default {...SvgElement.props} {...props} />;
  };
}
