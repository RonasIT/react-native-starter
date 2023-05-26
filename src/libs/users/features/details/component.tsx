import { yupResolver } from '@hookform/resolvers/yup';
import React, { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Keyboard } from 'react-native-ui-lib';
import { userApi } from '@libs/shared/data-access/api/user/api';
import { User } from '@libs/shared/data-access/api/user/models';
import { useTranslation } from '@libs/shared/features/i18n';
import { colors, createStyles } from '@libs/shared/ui/styles';
import { AppButton } from '@libs/shared/ui/ui-kit/button';
import { InputFormGroup } from '@libs/shared/ui/ui-kit/input-form-group';
import { AppText } from '@libs/shared/ui/ui-kit/text';
import { UserSchema } from './forms';

interface UserDetailsProps {
  id?: number;
  onSuccessfulDelete?: () => void;
}

export function UserDetails({ id, onSuccessfulDelete }: UserDetailsProps): ReactElement {
  const translate = useTranslation('USERS.DETAILS');

  const [loadUser, { data: user }] = userApi.useLazyGetQuery();
  const [createUser, { isLoading: isCreating, isSuccess: isCreateSuccess, error }] = userApi.useCreateMutation();
  const [updateUser, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = userApi.useUpdateMutation();
  const [deleteUser, { isLoading: isDeleting, isSuccess: isDeleteSuccess }] = userApi.useDeleteMutation();

  const form = useForm({
    defaultValues: new UserSchema(),
    resolver: yupResolver(UserSchema.validationSchema)
  });
  const { handleSubmit, formState, control } = form;

  if (user) {
    form.setValue('name', user.name);
    form.setValue('email', user.email);
    form.setValue('gender', user.gender);
    form.setValue('status', user.status);
  }

  useEffect(() => {
    if (id) {
      loadUser({ id });
    }
  }, []);

  useEffect(() => {
    if (isDeleteSuccess) {
      onSuccessfulDelete?.();
    }
  }, [isDeleteSuccess]);

  const formSubmitted = (values: UserSchema): void => {
    if (id) {
      updateUser(new User({ id, ...values }));
    } else {
      createUser(new User(values));
    }
  };

  const deleteButtonPressed = (): void => {
    deleteUser(user.id);
  };

  return (
    <>
      <ScrollView>
        <AppText variant='large' style={style.title}>
          {id ? translate('TEXT_EDIT') : translate('TEXT_CREATE')}
        </AppText>
        <InputFormGroup
          label={translate('TEXT_EMAIL')}
          name='email'
          autoCapitalize='none'
          keyboardType='email-address'
          control={control}
        />
        <InputFormGroup
          label={translate('TEXT_NAME')}
          name='name'
          control={control} />
        <InputFormGroup
          label={translate('TEXT_GENDER')}
          name='gender'
          control={control} />
        <InputFormGroup
          label={translate('TEXT_STATUS')}
          name='status'
          control={control} />
        {error && (
          <AppText style={style.error}>
            {translate('TEXT_ERROR')}: {JSON.stringify(error)}
          </AppText>
        )}
        {(isCreateSuccess || isUpdateSuccess) && <AppText style={style.success}>{translate('TEXT_SUCCESS')}</AppText>}
        <View style={style.footer}>
          {id && (
            <AppButton
              isLoading={isDeleting}
              label={translate('BUTTON_DELETE')}
              onPress={deleteButtonPressed}
              style={[style.button, style.deleteButton]}
              theme='secondary'
            />
          )}
          <AppButton
            isLoading={isCreating || isUpdating}
            disabled={!formState.isValid && formState.submitCount > 0}
            label={translate('BUTTON_SAVE')}
            onPress={handleSubmit(formSubmitted)}
            style={style.button}
          />
        </View>
      </ScrollView>
      <Keyboard.KeyboardAwareInsetsView />
    </>
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
  },
  error: {
    color: colors.danger
  },
  success: {
    color: colors.primary
  }
});
