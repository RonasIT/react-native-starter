import { RouteProp } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HomeNavigationParams } from '@app/main/home/navigation';
import { AppButton } from '@shared/button';
import { useTranslation } from '@shared/i18n';
import { InputFormGroup } from '@shared/input-form-group';
import { AppScreen } from '@shared/screen';
import { AppText, TextTheme } from '@shared/text';
import { User } from '@shared/user';
import { userAPI } from '@shared/user/api';
import { commonStyle, createStyles } from '@styles';
import { UserForm } from './shared/forms';

export function UserScreen(props: { route: RouteProp<HomeNavigationParams, 'User'> }): JSX.Element {
  const id = props.route.params?.id;
  const translate = useTranslation('MAIN.USER');
  const { useLazyGetQuery, useCreateMutation, useUpdateMutation, useDeleteMutation } = userAPI;
  const [loadUser, { data: user }] = useLazyGetQuery();
  const [createUser, { isLoading: isCreating, isSuccess: isCreateSuccess, error }] = useCreateMutation();
  const [updateUser, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteMutation();

  useEffect(() => {
    if (id) {
      loadUser({ id });
    }
  }, []);

  useEffect(() => {
    if (user) {
      formik.setValues({
        email: user.email,
        name: user.name,
        gender: user.gender,
        status: user.status
      });
    }
  }, [user]);

  function formSubmitted(values: UserForm): void {
    if (id) {
      updateUser(new User({ id, ...values }));
    } else {
      createUser(new User(values));
    }
  }

  function deleteButtonPressed(): void {
    deleteUser(user.id);
  }

  const formik = useFormik({
    initialValues: new UserForm(),
    validationSchema: UserForm.validationSchema,
    onSubmit: formSubmitted
  });
  const { handleSubmit } = formik;

  return (
    <KeyboardAwareScrollView>
      <AppScreen style={commonStyle.container}>
        <AppText theme={TextTheme.LARGE} style={style.title}>
          {id ? translate('TEXT_EDIT') : translate('TEXT_CREATE')}
        </AppText>
        <InputFormGroup<UserForm>
          label={translate('TEXT_EMAIL')}
          name='email'
          autoCapitalize='none'
          keyboardType='email-address'
          formik={formik}
        />
        <InputFormGroup
          label={translate('TEXT_NAME')}
          name='name'
          formik={formik} />
        <InputFormGroup
          label={translate('TEXT_GENDER')}
          name='gender'
          formik={formik} />
        <InputFormGroup
          label={translate('TEXT_STATUS')}
          name='status'
          formik={formik} />
        {error && (
          <AppText>
            {translate('TEXT_ERROR')}: {JSON.stringify(error)}
          </AppText>
        )}
        {(isCreateSuccess || isUpdateSuccess) && <AppText>{translate('TEXT_SUCCESS')}</AppText>}
        <View style={style.footer}>
          {id && (
            <AppButton
              isLoading={isDeleting}
              title={translate('BUTTON_DELETE')}
              onPress={deleteButtonPressed}
              style={[style.button, style.deleteButton]}
              theme='secondary'
            />
          )}
          <AppButton
            isLoading={isCreating || isUpdating}
            isDisabled={!formik.isValid && formik.submitCount > 0}
            title={translate('BUTTON_SAVE')}
            onPress={() => handleSubmit()}
            style={style.button}
          />
        </View>
      </AppScreen>
    </KeyboardAwareScrollView>
  );
}

const style = createStyles({
  title: {
    marginVertical: '2rem'
  },
  footer: {
    marginTop: '1.5rem',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    flex: 1
  },
  deleteButton: {
    marginRight: '1rem'
  }
});
