import { useSignIn } from '@clerk/clerk-expo';
import { SignInFirstFactor, EmailCodeFactor } from '@clerk/types';
import React from 'react';
import { View } from 'react-native';
import { createStyles } from '@libs/shared/ui/styles';
import { AppButton } from '@libs/shared/ui/ui-kit/button';
import { Input } from '@libs/shared/ui/ui-kit/input';
import { AppText } from '@libs/shared/ui/ui-kit/text';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function ClerkEmailOtpSignIn({ onSuccess }: LoginFormProps): JSX.Element {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');

  const handleSubmit = async (): Promise<void> => {
    const signInAttempt = await signIn?.create({ identifier: email });

    const isEmailCodeFactor = (factor: SignInFirstFactor): factor is EmailCodeFactor => {
      return factor.strategy === 'email_code';
    };
    const emailCodeFactor = signInAttempt?.supportedFirstFactors?.find(isEmailCodeFactor);

    if (emailCodeFactor?.emailAddressId)
      await signIn?.prepareFirstFactor({ strategy: 'email_code', emailAddressId: emailCodeFactor?.emailAddressId });
  };

  const onPressVerify = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }

    const signInAttempt = await signIn.attemptFirstFactor({
      strategy: 'email_code',
      code
    });

    if (signInAttempt.status === 'complete') {
      await setActive({ session: signInAttempt.createdSessionId });
      onSuccess?.();
    }
  };

  return (
    <View style={style.content}>
      <AppText variant='large' style={style.title}>
        Sign In with Email OTP
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
