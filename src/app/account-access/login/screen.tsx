import { yupResolver } from '@hookform/resolvers/yup';
import Constants from 'expo-constants';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Keyboard } from 'react-native-ui-lib';
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
    <AppScreen style={commonStyle.container}>
      <ScrollView>
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
        <Keyboard.KeyboardAwareInsetsView />
      </ScrollView>
    </AppScreen>
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
