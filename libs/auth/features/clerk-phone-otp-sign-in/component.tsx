import { useSignIn } from '@clerk/clerk-expo';
import { SignInFirstFactor, PhoneCodeFactor } from '@clerk/types';
import React from 'react';
import { View } from 'react-native';
import { createStyles } from '@libs/shared/ui/styles';
import { AppButton } from '@libs/shared/ui/ui-kit/button';
import { Input } from '@libs/shared/ui/ui-kit/input';
import { AppText } from '@libs/shared/ui/ui-kit/text';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function ClerkPhoneOtpSignIn({ onSuccess }: LoginFormProps): JSX.Element {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [phone, setPhone] = React.useState('');
  const [code, setCode] = React.useState('');

  const handleSubmit = async (): Promise<void> => {
    const signInAttempt = await signIn?.create({ identifier: phone });

    const isEmailCodeFactor = (factor: SignInFirstFactor): factor is PhoneCodeFactor => {
      return factor.strategy === 'phone_code';
    };
    const phoneCodeFactor = signInAttempt?.supportedFirstFactors?.find(isEmailCodeFactor);

    if (phoneCodeFactor?.phoneNumberId)
      await signIn?.prepareFirstFactor({ strategy: 'phone_code', phoneNumberId: phoneCodeFactor?.phoneNumberId });
  };

  const onPressVerify = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }

    const signInAttempt = await signIn.attemptFirstFactor({
      strategy: 'phone_code',
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
        Sign In with Phone OTP
      </AppText>
      <View style={style.section}>
        <Input
          onChangeText={setPhone}
          label={'Phone'}
          testID='email-input'
          autoCapitalize='none'
          keyboardType='phone-pad'
        />
        <AppButton label={'Submit'} onPress={handleSubmit} />
      </View>
      <View style={style.section}>
        <Input onChangeText={setCode} label={'Phone Code'} />
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
