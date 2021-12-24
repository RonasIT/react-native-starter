import { FormGroup, FormGroupProps } from '@shared/form-group';
import { AppTextInput, AppTextInputProps } from '@shared/text-input';
import React, { ReactElement, useState } from 'react';
import { FormikProps, FormikValues } from 'formik';

type FormGroupAndControlProps<T> = FormGroupProps<T> & AppTextInputProps;

export interface InputFormGroupProps<T = FormikValues> extends FormGroupAndControlProps<T> {
  formik: FormikProps<T>;
}

export function InputFormGroup<T = FormikValues>({
  label,
  name,
  formik,
  ...restProps
}: InputFormGroupProps<T>): ReactElement {
  const [hasError, setError] = useState(false);

  return (
    <FormGroup
      label={label}
      name={name}
      errors={formik.errors}
      touched={formik.touched}
      isSubmitted={formik.submitCount > 0}
      onErrorStateChange={setError}>
      <AppTextInput
        name={name}
        hasError={hasError}
        {...formik}
        {...restProps} />
    </FormGroup>
  );
}
