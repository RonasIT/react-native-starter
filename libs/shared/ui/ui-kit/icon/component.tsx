import { ReactElement } from 'react';
import { SvgProps } from 'react-native-svg';
import { colors } from '../../styles';
import { IconName, Icons } from '../assets/icons';

export interface IconProps extends SvgProps {
  name: IconName;
}

export function Icon({ name, color = colors.textPrimary, ...restProps }: IconProps): ReactElement | null {
  return name in Icons ? Icons[name]({ color, ...restProps }) : null;
}
