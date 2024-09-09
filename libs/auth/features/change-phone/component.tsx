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

export function ClerkChangePhone({ onSuccess }: LoginFormProps): JSX.Element {
  const [phone, setPhone] = React.useState('');
  const [code, setCode] = React.useState('');
  const [phoneToUpdateId, setPhoneToUpdateId] = useState('');

  const { user: clerkUser } = useUser();

  const handleSubmit = async (): Promise<void> => {
    const phoneResource = await clerkUser?.createPhoneNumber({ phoneNumber: phone });
    await phoneResource?.prepareVerification();
    await clerkUser?.reload();
    phoneResource && setPhoneToUpdateId(phoneResource?.id);
  };

  const onPressVerify = async (): Promise<void> => {
    const phoneToVerify = clerkUser?.phoneNumbers.find((email) => email.id === phoneToUpdateId);
    const verifiedPhone = await phoneToVerify?.attemptVerification({ code });
    await clerkUser?.update({ primaryPhoneNumberId: verifiedPhone?.id });
    const updatedUser = await clerkUser?.reload();
    updatedUser?.phoneNumbers.forEach((phone) => {
      if (phone.id !== phoneToUpdateId) {
        phone.destroy();
      }
    });
    onSuccess?.();
    Alert.alert('Phone updated');
  };

  return (
    <View style={style.content}>
      <AppText variant='large' style={style.title}>
        Change Phone
      </AppText>
      <View style={style.section}>
        <Input
          onChangeText={setPhone}
          label={'Phone'}
          autoCapitalize='none'
          keyboardType='phone-pad' />
        <AppButton label={'Submit'} onPress={handleSubmit} />
      </View>
      <View style={style.section}>
        <Input onChangeText={setCode} label={'SMS Code'} />
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
