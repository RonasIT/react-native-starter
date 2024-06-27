import { useRouter } from 'expo-router';
import React from 'react';
import { LoginForm } from '@libs/auth/features/login-form';
import { commonStyle } from '@libs/shared/ui/styles';
import { AppScreen } from '@libs/shared/ui/ui-kit/screen';

export default function LoginScreen(): JSX.Element {
  const router = useRouter();

  const handleLoginSuccess = (): void => {
    router.replace('home');
  };

  return (
    <AppScreen style={commonStyle.container}>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </AppScreen>
  );
}
