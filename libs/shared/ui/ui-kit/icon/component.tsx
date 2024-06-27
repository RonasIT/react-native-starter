import { ReactNode } from 'react';
import { SvgProps } from 'react-native-svg';
import { colors } from '../../styles';
import { IconName, Icons } from '../assets/icons';

export interface IconProps extends SvgProps {
  name: IconName;
}

export function Icon({ name, color = colors.textPrimary, style }: IconProps): ReactNode {
  return name in Icons ? Icons[name]({ color, style }) : null;
}
