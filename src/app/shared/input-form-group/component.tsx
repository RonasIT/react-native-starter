import React, { ReactElement } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { FormGroup, FormGroupProps } from '@shared/form-group';
import { AppTextInput, AppTextInputProps } from '@shared/text-input';

type FormGroupAndControlProps = FormGroupProps & AppTextInputProps;

export interface InputFormGroupProps<T = FieldValues> extends FormGroupAndControlProps {
  name: Path<T>;
  control: Control<T>;
}

export function InputFormGroup<T = FieldValues>({
  label,
  name,
  control,
  ...restProps
}: InputFormGroupProps<T>): ReactElement {
  const { field, fieldState } = useController({ control, name });

  return (
    <FormGroup label={label} error={fieldState.error?.message}>
      <AppTextInput
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        hasError={!!fieldState.error}
        {...restProps}
      />
    </FormGroup>
  );
}
