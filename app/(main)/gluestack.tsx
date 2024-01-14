import { Text } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormSchema } from '@libs/auth/features/login-form/forms';
import { commonStyle, createStyles } from '@libs/shared/ui/styles';
import { GluestackButton } from '@libs/shared/ui/ui-kit/button/gluestack-component';
import { GluestackInputFormGroup } from '@libs/shared/ui/ui-kit/input-form-group/gluestack-component';
import { GlueStackAppScreen } from '@libs/shared/ui/ui-kit/screen/gluestack-component';

export default function GlueStackScreen(): ReactElement {
  const form = useForm<LoginFormSchema>({
    defaultValues: new LoginFormSchema(),
    resolver: yupResolver(LoginFormSchema.validationSchema)
  });

  return (
    <GlueStackAppScreen style={[commonStyle.container, style.container]}>
      <GluestackButton title='Primary' />
      <GluestackButton size='small' title='Small' />
      <GluestackInputFormGroup name='email' control={form.control} />
      <Text size='largest'>Largest Text</Text>
      <Text size='larger'>Larger Text</Text>
    </GlueStackAppScreen>
  );
}

const style = createStyles({
  container: {
    flex: 1,
    gap: 10
  }
});
