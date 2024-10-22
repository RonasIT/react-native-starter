import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { ReactElement, useEffect, useState } from 'react';
import { ClerkChangeEmail } from '@libs/auth/features/change-email';
import { ClerkChangePhone } from '@libs/auth/features/change-phone';
import { getProfile } from '@libs/auth/utils/get-user';
import { AppButton } from '@libs/shared/ui/ui-kit/button';
import { AppText } from '@libs/shared/ui/ui-kit/text';
import { AppScreen } from '../../../libs/shared/ui/ui-kit/screen';

export default function HomeScreen(): ReactElement {
  const { getToken, signOut } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState<any>();

  const handleLogout = async (): Promise<void> => {
    await signOut();
    router.replace('/');
  };

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      const token = await getToken();

      if (token) {
        const user = await getProfile(token);
        setUser(JSON.stringify(user));
      }
    };

    fetchUser();
  }, []);

  return (
    <AppScreen testID='home-screen'>
      <AppText>{user}</AppText>
      <AppButton label={'Logout'} onPress={handleLogout} />
      <ClerkChangePhone />
      <ClerkChangeEmail />
    </AppScreen>
  );
}
