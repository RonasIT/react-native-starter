import React, { ReactElement } from 'react';
import { View, ViewStyle } from 'react-native';
import { AppText } from '@shared/text';
import { AppTextInputProps } from '@shared/text-input';
import { createStyles } from '@styles';

export interface FormGroupProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  children?: ReactElement;
}

export function FormGroup<T = AppTextInputProps>({
  error,
  label,
  containerStyle,
  children
}: FormGroupProps & T): ReactElement {
  return (
    <View style={[style.formGroup, containerStyle]}>
      {!!label && (
        <AppText style={style.formGroupLabel} larger>
          {label}
        </AppText>
      )}
      {children}
      <AppText danger testID='validation-error'>
        {error}
      </AppText>
    </View>
  );
}

const style = createStyles({
  formGroup: {
    marginBottom: '1.2rem'
  },
  formGroupLabel: {
    marginBottom: '0.5rem'
  }
});
