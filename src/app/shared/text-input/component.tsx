import { commonStyle, createStyles, variables } from '@styles';
import { noop } from 'lodash';
import React, { ForwardedRef, ReactElement, RefObject, useMemo, useRef, useState } from 'react';
import { StyleProp, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Icon } from '@shared/icon';
import { Control, useController } from 'react-hook-form';

export interface AppTextInputProps extends TextInputProps {
  control?: Control;
  name?: string;
  isPassword?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  icon?: ReactElement;
  onTouchEnd?: () => void;
  inputLeft?: ReactElement;
  onClickIcon?: () => void;
}

export const AppTextInput = React.forwardRef(function Component(
  props: AppTextInputProps,
  ref: ForwardedRef<TextInput> & Partial<RefObject<TextInput>>
): ReactElement {
  const {
    name,
    control,
    isPassword,
    disabled,
    style: elementStyle = {},
    containerStyle,
    icon,
    onTouchEnd = noop,
    inputLeft,
    onClickIcon,
    ...restProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isSecured, setSecurity] = useState(true);
  const { field, fieldState } = useController({
    control,
    name
  });

  const inputRef = ref || useRef<TextInput>();

  const onTouchStart = (): void => inputRef?.current?.focus();

  const renderedIconComponent = useMemo(() => {
    if (!icon) {
      return null;
    }

    return onClickIcon ? (
      <TouchableOpacity onPress={onClickIcon} style={commonStyle.formInputIcon}>
        <View>{icon}</View>
      </TouchableOpacity>
    ) : (
      <View style={commonStyle.formInputIcon}>{icon}</View>
    );
  }, [onClickIcon, icon]);

  const renderedEyeIcon = useMemo(
    () => isPassword && (
      <TouchableOpacity style={style.toggleButton} onPress={() => setSecurity(!isSecured)}>
        <Icon name={isSecured ? 'eye' : 'eyeHide'} />
      </TouchableOpacity>
    ),
    [isPassword, isSecured]
  );

  return (
    <View
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={[
        commonStyle.formControl,
        fieldState.error && commonStyle.formControlError,
        isFocused && commonStyle.formControlFocus,
        isPassword && style.textInputPassword,
        icon && style.textInputWithIcon,
        containerStyle
      ]}>
      {inputLeft}
      <TextInput
        secureTextEntry={isSecured && isPassword}
        placeholderTextColor={variables.color.white + '80'}
        editable={!disabled}
        underlineColorAndroid='transparent'
        style={[commonStyle.formInput, elementStyle, disabled && commonStyle.formInputDisabled]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          field.onBlur();
        }}
        ref={inputRef}
        onChangeText={field.onChange}
        value={field.value}
        {...restProps}
      />
      {renderedEyeIcon}
      {renderedIconComponent}
    </View>
  );
});

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
