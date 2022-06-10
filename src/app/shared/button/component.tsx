import React, { ReactElement } from 'react';
import { ButtonProps, Colors, Typography } from 'react-native-ui-lib';
import Button from 'react-native-ui-lib/button';
import { AppActivityIndicator } from '@shared/activity-indicator';
import { createStyles, variables } from '@styles';

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
    primary: Colors.primary,
    secondary: Colors.backgroundSecondary,
    default: Colors.white + '1A'
  }[mode];

  return (
    <Button
      activeOpacity={0.6}
      style={[style.button, elementStyle]}
      backgroundColor={backgroundColor}
      disabled={disabled || isLoading}
      disabledBackgroundColor={isLoading ? backgroundColor : Colors.backgroundSecondary + '8B'}
      label={isLoading ? '' : label}
      labelStyle={[textStyle.button, textStyle.buttonPrimary, disabled && textStyle.buttonDisabled]}
      {...restProps}>
      {isLoading && <AppActivityIndicator
        size={'small'}
        color={Colors.white}
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
    fontFamily: variables.fontFamily.sfProTextSemiBold,
    fontSize: Typography.medium.fontSize,
    fontWeight: '600',
    textAlign: 'center'
  },
  buttonPrimary: {
    color: Colors.white
  },
  buttonDisabled: {
    color: Colors.white,
    opacity: 0.5
  }
});
