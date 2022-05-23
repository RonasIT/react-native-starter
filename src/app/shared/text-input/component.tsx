import { commonStyle, createStyles, variables } from '@styles';
import { noop } from 'lodash';
import React, { ForwardedRef, ReactElement, RefObject, useMemo, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { Icon } from '@shared/icon';
import { Control, useController } from 'react-hook-form';

export interface AppTextInputProps extends TextInputProps {
  control?: Control;
  name?: string;
  disabled?: boolean;
  hasError?: boolean;
  isPassword?: boolean;
  icon?: ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
  onClickIcon?: () => void;
  onTouchEnd?: () => void;
  inputLeft?: ReactElement;
}

export const AppTextInput = React.forwardRef(function Component(
  props: AppTextInputProps,
  ref: ForwardedRef<TextInput> & Partial<RefObject<TextInput>>
): ReactElement {
  const {
    control,
    style: elementStyle = {},
    disabled,
    hasError,
    isPassword,
    name,
    icon,
    containerStyle,
    onFocus = noop,
    onBlur = noop,
    onTouchEnd = noop,
    onClickIcon,
    inputLeft,
    ...restProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isSecured, setSecurity] = useState(true);
  const { field, fieldState } = useController({
    control,
    name
  });

  const inputRef = ref || useRef<TextInput>();

  const commonInputProps: TextInputProps = {
    value: field.value,
    onChangeText: field.onChange,
    onFocus: (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus(event);
      setIsFocused(true);
    },
    onBlur: (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur(event);
      setIsFocused(false);
      field.onBlur();
    },
    editable: !disabled,
    underlineColorAndroid: 'transparent',
    style: [commonStyle.formInput, elementStyle, disabled && commonStyle.formInputDisabled]
  };

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
        ref={inputRef}
        secureTextEntry={isSecured && isPassword}
        placeholderTextColor={variables.color.white + '80'}
        {...commonInputProps}
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
