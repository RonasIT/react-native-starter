import React, { ReactElement, useMemo } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { AppActivityIndicator } from '@shared/activity-indicator';
import { AppText } from '@shared/text';
import { createStyles, variables } from '@styles';

interface Props extends TouchableOpacityProps {
  title?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  theme?: 'primary' | 'secondary' | 'default';
}

export function AppButton({
  title,
  style: elementStyle = {},
  isDisabled,
  isLoading,
  theme: mode = 'primary',
  children,
  ...restProps
}: Props): ReactElement {
  const renderedContent = useMemo(() => {
    if (isLoading) {
      return <AppActivityIndicator
        size={'small'}
        color={variables.color.white}
        style={style.activityIndicator} />;
    }

    return title ? (
      <AppText style={[textStyle.button, textStyle.buttonPrimary, isDisabled && textStyle.buttonDisabled]}>
        {title}
        {children}
      </AppText>
    ) : (
      children
    );
  }, [isLoading, isDisabled, title, children]);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        style.button,
        mode === 'primary' && style.buttonPrimary,
        mode === 'default' && style.buttonDefault,
        mode === 'secondary' && style.buttonSecondary,
        isDisabled && style.buttonDisabled,
        elementStyle
      ]}
      disabled={isDisabled || isLoading}
      {...restProps}>
      {renderedContent}
    </TouchableOpacity>
  );
}

const style = createStyles({
  button: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    width: '100%',
    alignItems: 'center'
  },
  buttonPrimary: {
    backgroundColor: variables.color.primary,
    borderColor: variables.color.primary,
    shadowColor: variables.color.primary
  },
  buttonDefault: {
    backgroundColor: variables.color.white + '1A',
    borderColor: variables.color.white + '1A',
    shadowColor: variables.color.white + '1A'
  },
  buttonSecondary: {
    backgroundColor: variables.color.backgroundSecondary,
    borderColor: variables.color.backgroundSecondary
  },
  buttonDisabled: {
    backgroundColor: variables.color.backgroundSecondary + '8B',
    borderColor: variables.color.backgroundSecondary + '8B'
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
    fontSize: variables.fontSize.medium,
    fontWeight: '600',
    textAlign: 'center'
  },
  buttonPrimary: {
    color: variables.color.white
  },
  buttonDisabled: {
    color: variables.color.white,
    opacity: 0.5
  }
});
