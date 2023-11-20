import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField
} from '@gluestack-ui/themed';
import React, { ReactElement, useMemo, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { createStyles, rem } from '@libs/shared/ui/styles';
import { Icon } from '../icon';

export interface InputFormGroupProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  inputProps?: Omit<React.ComponentProps<typeof Input>, 'children'>;
  inputFieldProps?: React.ComponentProps<typeof InputField>;
  label?: string;
}

export function GluestackInputFormGroup<T extends FieldValues = FieldValues>({
  name,
  control,
  inputProps = {},
  inputFieldProps,
  label
}: InputFormGroupProps<T>): ReactElement {
  const { field, fieldState } = useController({ control, name });
  const { type, testID, ...restInputFieldProps } = inputFieldProps || {};
  const isPassword = type === 'password';
  const [isSecured, setSecurity] = useState(true);

  const renderedEyeIcon = useMemo(
    () => isPassword && (
      <TouchableOpacity style={style.toggleButton} onPress={() => setSecurity(!isSecured)}>
        <Icon name={isSecured ? 'eye' : 'eyeHide'} />
      </TouchableOpacity>
    ),
    [isPassword, isSecured]
  );

  return (
    <FormControl isInvalid={fieldState.invalid}>
      <FormControlLabel mb={0.25 * rem}>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input {...inputProps}>
        <InputField
          secureTextEntry={isSecured}
          onChangeText={field.onChange}
          value={field.value}
          {...restInputFieldProps}
        />
        {renderedEyeIcon}
      </Input>
      <FormControlError>
        <FormControlErrorText>{fieldState.error?.message}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}

const style = createStyles({
  toggleButton: {
    height: '100%',
    top: 0,
    width: 30,
    justifyContent: 'center',
    opacity: 0.5
  },
  textInputPassword: {
    paddingRight: 50
  }
});
