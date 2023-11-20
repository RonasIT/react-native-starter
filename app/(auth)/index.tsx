import { useRouter } from 'expo-router';
import React from 'react';
import { LoginForm } from '@libs/auth/features/login-form';
import { GlueStackAppScreen } from '@libs/shared/ui/ui-kit/screen/gluestack-component';

export default function LoginScreen(): JSX.Element {
  const router = useRouter();

  const handleLoginSuccess = (): void => {
    router.replace('home');
  };

  return (
    <GlueStackAppScreen>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </GlueStackAppScreen>
  );
}
