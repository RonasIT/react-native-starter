import { FormGroup, FormGroupProps } from '@shared/form-group';
import { AppTextInput, AppTextInputProps } from '@shared/text-input';
import React, { ReactElement } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type FormGroupAndControlProps<T> = FormGroupProps<T> & AppTextInputProps;

export interface InputFormGroupProps<T = FieldValues> extends FormGroupAndControlProps<T> {
  form: UseFormReturn<T>;
}

export function InputFormGroup<T = FieldValues>({
  label,
  name,
  form,
  ...restProps
}: InputFormGroupProps<T>): ReactElement {
  return (
    <FormGroup
      label={label}
      name={name}
      errors={form.formState.errors}>
      <AppTextInput
        name={name}
        {...form}
        {...restProps} />
    </FormGroup>
  );
}
