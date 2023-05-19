import React from 'react';
import { LoginForm } from '@libs/auth/features/login-form';
import { commonStyle } from '@libs/shared/ui/styles';
import { AppScreen } from '@libs/shared/ui/ui-kit/screen';

export function LoginScreen(): JSX.Element {
  return (
    <AppScreen style={commonStyle.container}>
      <LoginForm />
    </AppScreen>
  );
}
