import { useSignUp } from '@clerk/clerk-expo';
import React from 'react';
import { View } from 'react-native';
import { createStyles } from '@libs/shared/ui/styles';
import { AppButton } from '@libs/shared/ui/ui-kit/button';
import { Input } from '@libs/shared/ui/ui-kit/input';
import { AppText } from '@libs/shared/ui/ui-kit/text';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function ClerkUsernameSignUp({ onSuccess }: LoginFormProps): JSX.Element {
  const { signUp, setActive } = useSignUp();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    const completeSignIn = await signUp?.create({ username, password });
    await setActive?.({ session: completeSignIn?.createdSessionId });
    setIsLoading(false);
    onSuccess?.();
  };

  return (
    <View style={style.content}>
      <AppText variant='large' style={style.title}>
        Sign Up with user name and password
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
