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

export function ClerkPhoneOtpSignUp({ onSuccess }: LoginFormProps): JSX.Element {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [phone, setPhone] = React.useState('');
  const [code, setCode] = React.useState('');

  const handleSubmit = async (): Promise<void> => {
    await signUp?.create({ phoneNumber: phone });
    await signUp?.preparePhoneNumberVerification();
  };

  const onPressVerify = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }

    const completeSignUp = await signUp.attemptPhoneNumberVerification({
      code
    });

    await setActive({ session: completeSignUp.createdSessionId });
    onSuccess?.();
  };

  return (
    <View style={style.content}>
      <AppText variant='large' style={style.title}>
        Sign Up with Phone OTP
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
