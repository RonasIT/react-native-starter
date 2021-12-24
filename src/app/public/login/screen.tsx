import { AppButton } from '@shared/button';
import { useTranslation } from '@shared/i18n';
import { InputFormGroup } from '@shared/input-form-group';
import { AppScreen } from '@shared/screen';
import { AppText, TextTheme } from '@shared/text';
import { commonStyle, createStyles } from '@styles';
import Constants from 'expo-constants';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { loginScreenFacade } from './facade';
import { LoginForm } from './shared/forms';

export function LoginScreen(): JSX.Element {
  const translate = useTranslation('PUBLIC.LOGIN');
  const { isSubmitting } = loginScreenFacade;
  const appName = Constants.manifest.name;

  function formSubmitted(values: LoginForm): void {
    loginScreenFacade.authorize(values);
  }

  const formik = useFormik({
    initialValues: new LoginForm(),
    validationSchema: LoginForm.validationSchema,
    onSubmit: formSubmitted
  });
  const { handleSubmit } = formik;

  useEffect(() => {
    return () => {
      loginScreenFacade.reset();
    };
  }, []);

  return (
    <AppScreen style={[commonStyle.container, style.container]}>
      <View>
        <AppText style={style.title} theme={TextTheme.LARGEST}>
          {translate('TEXT_TITLE', { value: appName })}
        </AppText>
        <InputFormGroup<LoginForm>
          label={translate('TEXT_LOGIN')}
          name='email'
          testID='email-input'
          autoCapitalize='none'
          keyboardType='email-address'
          formik={formik}
        />
        <InputFormGroup<LoginForm>
          isPassword={true}
          testID='password-input'
          label={translate('TEXT_PASSWORD')}
          name='password'
          formik={formik}
        />
        <View style={style.footer}>
          <AppButton
            isLoading={isSubmitting}
            isDisabled={!formik.isValid && formik.submitCount > 0}
            testID='submit-button'
            title={translate('BUTTON_SUBMIT')}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </AppScreen>
  );
}

const style = createStyles({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    marginBottom: '4rem'
  },
  footer: {
    marginTop: '2rem'
  }
});
