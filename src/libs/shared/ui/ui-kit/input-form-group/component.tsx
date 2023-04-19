import { noop } from 'lodash';
import React, { ComponentProps, ReactElement, useMemo, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { NativeSyntheticEvent, TextInputFocusEventData, TouchableOpacity, View } from 'react-native';
import { ColorsModifiers, Incubator, MarginModifiers, TextField, TypographyModifiers } from 'react-native-ui-lib';
import { commonStyle, createStyles } from '@shared/ui/styles';
import { Icon } from '@shared/ui/ui-kit/icon';

export type InputFormGroupProps<T = FieldValues> = Omit<
  ComponentProps<typeof TextField>,
  keyof TypographyModifiers | keyof ColorsModifiers | keyof MarginModifiers
> & {
  name: Path<T>;
  control: Control<T>;
  disabled?: boolean;
  isPassword?: boolean;
  onClickTrailingAccessory?: () => void;
};

export function InputFormGroup<T = FieldValues>({
  name,
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
}: InputFormGroupProps<T>): ReactElement {
  const { field, fieldState } = useController({ control, name });
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
    [isPassword, isSecured]
  );

  function handleBlur(): void {
    field.onBlur();
    setIsFocused(false);
  }

  function handleFocus(event: NativeSyntheticEvent<TextInputFocusEventData>): void {
    onFocus(event);
    setIsFocused(true);
  }

  return (
    <Incubator.TextField
      value={field.value}
      onChangeText={field.onChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      editable={!disabled}
      underlineColorAndroid='transparent'
      labelStyle={commonStyle.formGroupLabel}
      enableErrors
      validationMessage={fieldState.error?.message}
      containerStyle={commonStyle.formGroup}
      fieldStyle={[
        commonStyle.formControl,
        !!fieldState.error && commonStyle.formControlError,
        isFocused && commonStyle.formControlFocus,
        isPassword && style.textInputPassword,
        trailingAccessory && style.textInputWithIcon,
        fieldStyle
      ]}
      style={[commonStyle.formInput, inputStyle, disabled && commonStyle.formInputDisabled]}
      validationMessageStyle={commonStyle.formGroupError}
      secureTextEntry={isSecured && isPassword}
      trailingAccessory={
        <>
          {renderedEyeIcon}
          {renderedTrailingAccessory}
        </>
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
