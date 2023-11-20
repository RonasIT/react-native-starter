import { Text } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import Constants from 'expo-constants';
import { isEmpty } from 'lodash';
import React, { Fragment, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Image } from 'react-native-ui-lib';
import { authAPI } from '@libs/shared/data-access/api/auth/api';
import { AuthCredentials } from '@libs/shared/data-access/api/auth/models';
import { useTranslation } from '@libs/shared/features/i18n';
import { createStyles } from '@libs/shared/ui/styles';
import { AppThemeContext } from '@libs/shared/ui/styles/theme-provider';
import { AppVersion } from '@libs/shared/ui/ui-kit/app-version';
import { GluestackButton } from '@libs/shared/ui/ui-kit/button/gluestack-component';
import { GluestackInputFormGroup } from '@libs/shared/ui/ui-kit/input-form-group/gluestack-component';
import { LoginFormSchema } from './forms';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps): JSX.Element {
  const translate = useTranslation('AUTH.LOGIN_FORM');
  const [authorize, { isLoading, isSuccess }] = authAPI.useDemoAuthorizeMutation();
  const appName = Constants?.expoConfig?.name;

  const { onToggleTheme } = useContext(AppThemeContext);

  function formSubmitted(values: LoginFormSchema): void {
    authorize(new AuthCredentials(values));
  }

  const form = useForm<LoginFormSchema>({
    defaultValues: new LoginFormSchema(),
    resolver: yupResolver(LoginFormSchema.validationSchema)
  });
  const { handleSubmit, formState, control } = form;

  useEffect(() => {
    if (isSuccess) {
      onLoginSuccess();
    }
  }, [isSuccess]);

  return (
    <Fragment>
      <Image source={require('@libs/shared/ui/ui-kit/assets/images/logo.png')} style={style.logo} />
      <Text style={style.title} size='largest'>
        {translate('TEXT_TITLE', { value: appName })}
      </Text>
      <GluestackInputFormGroup<LoginFormSchema>
        label={translate('TEXT_LOGIN')}
        name='email'
        inputFieldProps={{ testID: 'email-input', autoCapitalize: 'none', keyboardType: 'email-address' }}
        control={control}
      />
      <GluestackInputFormGroup<LoginFormSchema>
        inputFieldProps={{ testID: 'password-input', type: 'password' }}
        label={translate('TEXT_PASSWORD')}
        name='password'
        control={control}
      />
      <View style={style.footer}>
        <GluestackButton
          isLoading={isLoading}
          disabled={!isEmpty(formState.errors) && formState.isSubmitted}
          testID='submit-button'
          title={translate('BUTTON_SUBMIT')}
          onPress={handleSubmit(formSubmitted)}
        />
        <GluestackButton onPress={onToggleTheme} title='Toggle theme' />
      </View>
      <AppVersion />
    </Fragment>
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
    marginTop: '2rem',
    gap: 10
  }
});
