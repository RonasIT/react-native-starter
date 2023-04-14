import { yupResolver } from '@hookform/resolvers/yup';
import Constants from 'expo-constants';
import { isEmpty } from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Image, Keyboard } from 'react-native-ui-lib';
import { assets } from '@assets/index';
import { commonStyle, createStyles } from '../../../libs/shared/ui/styles';
import { AppVersion } from '../../../libs/shared/ui/ui-kit/app-version';
import { AppButton } from '../../../libs/shared/ui/ui-kit/button';
import { InputFormGroup } from '../../../libs/shared/ui/ui-kit/input-form-group';
import { AppScreen } from '../../../libs/shared/ui/ui-kit/screen';
import { AppText } from '../../../libs/shared/ui/ui-kit/text';
import { useTranslation } from '../../../libs/shared/utils/i18n';
import { loginScreenFacade } from './facade';
import { LoginForm } from './shared/forms';

export function LoginScreen(): JSX.Element {
  const translate = useTranslation('ACCOUNT_ACCESS.LOGIN');
  const { isSubmitting } = loginScreenFacade;
  const appName = Constants.expoConfig.name;

  function formSubmitted(values: LoginForm): void {
    loginScreenFacade.authorize(values);
  }

  const form = useForm<LoginForm>({
    defaultValues: new LoginForm(),
    resolver: yupResolver(LoginForm.validationSchema)
  });
  const { handleSubmit, formState, control } = form;

  return (
    <AppScreen style={commonStyle.container}>
      <ScrollView contentContainerStyle={style.content}>
        <Image source={assets.brand.logo} style={style.logo} />
        <AppText style={style.title} variant='largest'>
          {translate('TEXT_TITLE', { value: appName })}
        </AppText>
        <InputFormGroup<LoginForm>
          label={translate('TEXT_LOGIN')}
          name='email'
          testID='email-input'
          autoCapitalize='none'
          keyboardType='email-address'
          control={control}
        />
        <InputFormGroup<LoginForm>
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
    </AppScreen>
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
