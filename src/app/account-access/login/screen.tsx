import { yupResolver } from '@hookform/resolvers/yup';
import Constants from 'expo-constants';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppVersion } from '@shared/app-version';
import { AppButton } from '@shared/button';
import { useTranslation } from '@shared/i18n';
import { InputFormGroup } from '@shared/input-form-group';
import { AppScreen } from '@shared/screen';
import { AppText, TextTheme } from '@shared/text';
import { commonStyle, createStyles } from '@styles';
import { loginScreenFacade } from './facade';
import { LoginForm } from './shared/forms';

export function LoginScreen(): JSX.Element {
  const translate = useTranslation('ACCOUNT_ACCESS.LOGIN');
  const { isSubmitting } = loginScreenFacade;
  const appName = Constants.manifest.name;

  function formSubmitted(values: LoginForm): void {
    loginScreenFacade.authorize(values);
  }

  const form = useForm<LoginForm>({
    defaultValues: new LoginForm(),
    resolver: yupResolver(LoginForm.validationSchema)
  });
  const { handleSubmit, formState, control } = form;

  return (
    <KeyboardAwareScrollView>
      <AppScreen style={commonStyle.container}>
        <AppText style={style.title} theme={TextTheme.LARGEST}>
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
            isDisabled={!formState.isValid && formState.isSubmitted}
            testID='submit-button'
            title={translate('BUTTON_SUBMIT')}
            onPress={handleSubmit(formSubmitted)}
          />
        </View>
        <AppVersion />
      </AppScreen>
    </KeyboardAwareScrollView>
  );
}

const style = createStyles({
  title: {
    marginVertical: '4rem'
  },
  footer: {
    marginTop: '2rem'
  }
});
