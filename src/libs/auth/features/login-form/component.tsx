import { yupResolver } from '@hookform/resolvers/yup';
import Constants from 'expo-constants';
import { isEmpty } from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Image, Keyboard } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { assets } from '@libs/auth/assets';
import { AuthCredentials } from '@libs/shared/data-access/auth';
import { AuthActions, AuthSelectors } from '@libs/shared/data-access/auth/store';
import { useTranslation } from '@libs/shared/features/i18n';
import { createStyles } from '@libs/shared/ui/styles';
import { AppVersion } from '@libs/shared/ui/ui-kit/app-version';
import { AppButton } from '@libs/shared/ui/ui-kit/button';
import { InputFormGroup } from '@libs/shared/ui/ui-kit/input-form-group';
import { AppText } from '@libs/shared/ui/ui-kit/text';
import { LoginFormSchema } from './forms';

export function LoginForm(): JSX.Element {
  const translate = useTranslation('AUTH.LOGIN_FORM');
  const isSubmitting = useSelector(AuthSelectors.isAuthorizing);
  const appName = Constants.expoConfig.name;
  const dispatch = useDispatch();

  function formSubmitted(values: LoginFormSchema): void {
    dispatch(AuthActions.authorize(new AuthCredentials(values)));
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
