import { FormikProps } from 'formik';
import React, { ReactElement, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import { AppText, TextTheme } from '@shared/text';
import { AppTextInputProps } from '@shared/text-input';
import { createStyles } from '@styles';

export interface FormGroupProps<T extends Record<string, any> = Record<string, any>>
  extends Partial<Pick<FormikProps<T>, 'errors' | 'touched'>> {
  label?: string;
  name: keyof T;
  isSubmitted?: boolean;
  containerStyle?: ViewStyle;
  children?: ReactElement;
  onErrorStateChange?: (hasError: boolean) => void;
}

export function FormGroup<T = AppTextInputProps>({
  errors,
  name,
  label,
  isSubmitted,
  touched,
  containerStyle,
  children,
  onErrorStateChange
}: FormGroupProps & T): ReactElement {
  const hasError = !!errors?.[name] && (isSubmitted || !!touched?.[name]);

  useEffect(() => {
    onErrorStateChange?.(hasError);
  }, [hasError]);

  return (
    <View style={[style.formGroup, containerStyle]}>
      {!!label && (
        <AppText theme={TextTheme.LARGER} style={style.formGroupLabel}>
          {label}
        </AppText>
      )}
      {children}
      <AppText testID='validation-error'>{errors[name] || ''}</AppText>
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
