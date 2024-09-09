import { useSignIn } from '@clerk/clerk-expo';
import React from 'react';
import { View } from 'react-native';
import { createStyles } from '@libs/shared/ui/styles';
import { AppButton } from '@libs/shared/ui/ui-kit/button';
import { Input } from '@libs/shared/ui/ui-kit/input';
import { AppText } from '@libs/shared/ui/ui-kit/text';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function ClerkUsernameSignIn({ onSuccess }: LoginFormProps): JSX.Element {
  const { signIn, setActive } = useSignIn();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    const signInAttempt = await signIn?.create({ identifier: username, password: password });

    if (signInAttempt?.status === 'complete') {
      await setActive?.({ session: signInAttempt.createdSessionId });
    }
    setIsLoading(false);
    onSuccess?.();
  };

  return (
    <View style={style.content}>
      <AppText variant='large' style={style.title}>
        Sign In with user name and password
      </AppText>
      <Input
        onChangeText={setUsername}
        label={'Username'}
        value={username}
        testID='email-input'
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <Input
        value={password}
        onChangeText={setPassword}
        isPassword={true}
        label={'Password'} />
      <View style={style.footer}>
        <AppButton
          label={'Submit'}
          onPress={handleSubmit}
          isLoading={isLoading} />
      </View>
    </View>
  );
}

const style = createStyles({
  content: {
    paddingVertical: 25,
    borderBottomColor: 'white',
    borderBottomWidth: 2
  },
  footer: {
    marginTop: '2rem'
  },
  title: {
    marginBottom: 20
  }
});
