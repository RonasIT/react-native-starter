import { Icons } from '@assets/icons';
import { ReactElement } from 'react';
import { ImageStyle } from 'react-native';

interface Props {
  name: keyof typeof Icons;
  fill?: string;
  stroke?: string;
  style?: ImageStyle;
}

export function Icon({ name, fill, stroke, style }: Props): ReactElement {
  return name in Icons ? Icons[name]({ fill, stroke, style }) : null;
}
