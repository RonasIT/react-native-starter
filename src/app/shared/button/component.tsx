import React, { ReactElement } from 'react';
import { Button, ButtonProps } from 'react-native-ui-lib';
import { AppActivityIndicator } from '@shared/activity-indicator';
import { colors, createStyles, fontFamilies, fontSizes } from '@styles';

type Props = ButtonProps & {
  isLoading?: boolean;
  theme?: 'primary' | 'secondary' | 'default';
};

export function AppButton({
  label,
  style: elementStyle = {},
  disabled,
  isLoading,
  theme: mode = 'primary',
  ...restProps
}: Props): ReactElement {
  const backgroundColor = {
    primary: colors.primary,
    secondary: colors.backgroundSecondary,
    default: colors.white + '1A'
  }[mode];

  return (
    <Button
      activeOpacity={0.6}
      style={[style.button, elementStyle]}
      backgroundColor={backgroundColor}
      disabled={disabled || isLoading}
      disabledBackgroundColor={isLoading ? backgroundColor : colors.backgroundSecondary + '8B'}
      label={isLoading ? '' : label}
      labelStyle={[textStyle.button, textStyle.buttonPrimary, disabled && textStyle.buttonDisabled]}
      {...restProps}>
      {isLoading && <AppActivityIndicator
        size={'small'}
        color={colors.white}
        style={style.activityIndicator} />}
    </Button>
  );
}

const style = createStyles({
  button: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center'
  },
  activityIndicator: {
    width: 30,
    height: 30
  }
});

const textStyle = createStyles({
  button: {
    lineHeight: 30,
    fontFamily: fontFamilies.sfProTextSemiBold,
    fontSize: fontSizes.medium,
    fontWeight: '600',
    textAlign: 'center'
  },
  buttonPrimary: {
    color: colors.white
  },
  buttonDisabled: {
    color: colors.white,
    opacity: 0.5
  }
});
