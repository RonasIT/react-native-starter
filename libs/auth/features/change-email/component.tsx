import { useUser } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { createStyles } from '@libs/shared/ui/styles';
import { AppButton } from '@libs/shared/ui/ui-kit/button';
import { Input } from '@libs/shared/ui/ui-kit/input';
import { AppText } from '@libs/shared/ui/ui-kit/text';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function ClerkChangeEmail({ onSuccess }: LoginFormProps): JSX.Element {
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const [emailToUpdateId, setEmailToUpdateId] = useState('');

  const { user: clerkUser } = useUser();

  const handleSubmit = async (): Promise<void> => {
    const emailResource = await clerkUser?.createEmailAddress({ email });
    await emailResource?.prepareVerification({ strategy: 'email_code' });
    await clerkUser?.reload();
    emailResource && setEmailToUpdateId(emailResource?.id);
    Alert.alert('Code was sent to your email');
  };

  const onPressVerify = async (): Promise<void> => {
    const emailToVerify = clerkUser?.emailAddresses.find((email) => email.id === emailToUpdateId);
    const verifiedEmail = await emailToVerify?.attemptVerification({ code });
    await clerkUser?.update({ primaryEmailAddressId: verifiedEmail?.id });
    onSuccess?.();
    Alert.alert('Email updated');
  };

  return (
    <View style={style.content}>
      <AppText variant='large' style={style.title}>
        Change Email
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
