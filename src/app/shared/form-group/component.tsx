import React, { ReactElement } from 'react';
import { FieldErrors } from 'react-hook-form';
import { View, ViewStyle } from 'react-native';
import { AppText, TextTheme } from '@shared/text';
import { AppTextInputProps } from '@shared/text-input';
import { createStyles } from '@styles';

export interface FormGroupProps<T extends Record<string, any> = Record<string, any>> {
  label?: string;
  name: keyof T;
  errors?: FieldErrors;
  containerStyle?: ViewStyle;
  children?: ReactElement;
}

export function FormGroup<T = AppTextInputProps>({
  errors,
  name,
  label,
  containerStyle,
  children
}: FormGroupProps & T): ReactElement {
  return (
    <View style={[style.formGroup, containerStyle]}>
      {!!label && (
        <AppText theme={TextTheme.LARGER} style={style.formGroupLabel}>
          {label}
        </AppText>
      )}
      {children}
      <AppText testID='validation-error'>{errors?.[name]?.message || ''}</AppText>
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
