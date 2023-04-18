import { yupResolver } from '@hookform/resolvers/yup';
import Constants from 'expo-constants';
import { isEmpty } from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Image, Keyboard } from 'react-native-ui-lib';
import { useTranslation } from '../../../shared/features/i18n';
import { createStyles } from '../../../shared/ui/styles';
import { AppVersion } from '../../../shared/ui/ui-kit/app-version';
import { AppButton } from '../../../shared/ui/ui-kit/button';
import { InputFormGroup } from '../../../shared/ui/ui-kit/input-form-group';
import { AppText } from '../../../shared/ui/ui-kit/text';
import { assets } from '../../assets';
import { loginScreenFacade } from './facade';
import { LoginFormSchema } from './forms';

export function LoginForm(): JSX.Element {
  const translate = useTranslation('ACCOUNT_ACCESS.LOGIN');
  const { isSubmitting } = loginScreenFacade;
  const appName = Constants.expoConfig.name;

  function formSubmitted(values: LoginFormSchema): void {
    loginScreenFacade.authorize(values);
  }

  const form = useForm<LoginFormSchema>({
    defaultValues: new LoginFormSchema(),
    resolver: yupResolver(LoginFormSchema.validationSchema)
  });
  const { handleSubmit, formState, control } = form;

  return (
    <ScrollView contentContainerStyle={style.content}>
      <Image source={assets.brand.logo} style={style.logo} />
      <AppText style={style.title} variant='largest'>
        {translate('TEXT_TITLE', { value: appName })}
      </AppText>
      <InputFormGroup<LoginFormSchema>
        label={translate('TEXT_LOGIN')}
        name='email'
        testID='email-input'
        autoCapitalize='none'
        keyboardType='email-address'
        control={control}
      />
      <InputFormGroup<LoginFormSchema>
        isPassword={true}
        testID='password-input'
        label={translate('TEXT_PASSWORD')}
        name='password'
        control={control}
      />
      <View style={style.footer}>
        <AppButton
          isLoading={isSubmitting}
          disabled={!isEmpty(formState.errors) && formState.isSubmitted}
          testID='submit-button'
          label={translate('BUTTON_SUBMIT')}
          onPress={handleSubmit(formSubmitted)}
        />
      </View>
      <AppVersion />
      <Keyboard.KeyboardAwareInsetsView />
    </ScrollView>
  );
}

const style = createStyles({
  content: {
    paddingTop: '2rem'
  },
  logo: {
    width: '3.5rem',
    height: '3.5rem'
  },
  title: {
    marginVertical: '2rem'
  },
  footer: {
    marginTop: '2rem'
  }
});
