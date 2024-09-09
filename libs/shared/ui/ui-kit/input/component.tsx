import { noop } from 'lodash';
import React, { ComponentProps, ReactElement, useMemo, useState } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps, TouchableOpacity, View } from 'react-native';
import { ColorsModifiers, Incubator, MarginModifiers, TextField, TypographyModifiers } from 'react-native-ui-lib';
import { commonStyle, createStyles } from '@libs/shared/ui/styles';
import { Icon } from '@libs/shared/ui/ui-kit/icon';

export type InputProps = Omit<
  ComponentProps<typeof TextField>,
  keyof TypographyModifiers | keyof ColorsModifiers | keyof MarginModifiers
> & {
  disabled?: boolean;
  isPassword?: boolean;
  onClickTrailingAccessory?: () => void;
} & TextInputProps;

export function Input({
  control,
  fieldStyle,
  onFocus = noop,
  disabled,
  isPassword,
  trailingAccessory,
  onClickTrailingAccessory,
  leadingAccessory,
  style: inputStyle = {},
  ...restProps
}: InputProps): ReactElement {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecured, setSecurity] = useState(true);

  const renderedTrailingAccessory = useMemo(() => {
    if (!trailingAccessory) {
      return null;
    }

    return onClickTrailingAccessory ? (
      <TouchableOpacity onPress={onClickTrailingAccessory} style={commonStyle.formInputIcon}>
        {trailingAccessory}
      </TouchableOpacity>
    ) : (
      <View style={commonStyle.formInputIcon}>{trailingAccessory}</View>
    );
  }, [onClickTrailingAccessory, trailingAccessory]);

  const renderedEyeIcon = useMemo(
    () => isPassword && (
      <TouchableOpacity style={style.toggleButton} onPress={() => setSecurity(!isSecured)}>
        <Icon name={isSecured ? 'eye' : 'eyeHide'} />
      </TouchableOpacity>
    ),
    [isPassword, isSecured],
  );

  function handleBlur(): void {
    setIsFocused(false);
  }

  function handleFocus(event: NativeSyntheticEvent<TextInputFocusEventData>): void {
    onFocus(event);
    setIsFocused(true);
  }

  return (
    <Incubator.TextField
      onBlur={handleBlur}
      onFocus={handleFocus}
      editable={!disabled}
      underlineColorAndroid='transparent'
      labelStyle={commonStyle.formGroupLabel}
      enableErrors
      containerStyle={commonStyle.formGroup}
      fieldStyle={[
        commonStyle.formControl,
        isFocused && commonStyle.formControlFocus,
        isPassword && style.textInputPassword,
        trailingAccessory && style.textInputWithIcon,
        fieldStyle
      ]}
      style={[commonStyle.formInput, inputStyle, disabled && commonStyle.formInputDisabled]}
      validationMessageStyle={commonStyle.formGroupError}
      secureTextEntry={isSecured && isPassword}
      trailingAccessory={
        <React.Fragment>
          {renderedEyeIcon}
          {renderedTrailingAccessory}
        </React.Fragment>
      }
      {...restProps}
    />
  );
}

const style = createStyles({
  toggleButton: {
    position: 'absolute',
    height: '100%',
    right: 20,
    top: 0,
    width: 30,
    justifyContent: 'center',
    opacity: 0.5
  },
  textInputPassword: {
    paddingRight: 50
  },
  textInputWithIcon: {
    paddingRight: 50
  }
});
