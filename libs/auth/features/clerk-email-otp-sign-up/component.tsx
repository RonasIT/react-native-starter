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

export function ClerkEmailOtpSignUp({ onSuccess }: LoginFormProps): JSX.Element {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');

  const handleSubmit = async (): Promise<void> => {
    await signUp?.create({ emailAddress: email });
    await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' });
  };

  const onPressVerify = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }

    const completeSignUp = await signUp.attemptEmailAddressVerification({
      code
    });

    await setActive({ session: completeSignUp.createdSessionId });
    onSuccess?.();
  };

  return (
    <View style={style.content}>
      <AppText variant='large' style={style.title}>
        Sign Up with Email OTP
      </AppText>
      <View style={style.section}>
        <Input
          onChangeText={setEmail}
          label={'Email'}
          testID='email-input'
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <AppButton label={'Submit'} onPress={handleSubmit} />
      </View>
      <View style={style.section}>
        <Input onChangeText={setCode} label={'Email Code'} />
        <AppButton label={'Submit'} onPress={onPressVerify} />
      </View>
    </View>
  );
}

const style = createStyles({
  content: {
    paddingVertical: 25,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    gap: '2rem'
  },
  section: {
    gap: '1rem'
  },
  title: {
    marginBottom: 20
  }
});
