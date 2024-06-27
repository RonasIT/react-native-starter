import { yupResolver } from '@hookform/resolvers/yup';
import React, { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { userAPI } from '@libs/shared/data-access/api/user/api';
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

  const { data: user } = userAPI.useGetQuery({ id: id as number }, { skip: !id });
  const [createUser, { isLoading: isCreating, isSuccess: isCreateSuccess, error }] = userAPI.useCreateMutation();
  const [updateUser, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = userAPI.useUpdateMutation();
  const [deleteUser, { isLoading: isDeleting, isSuccess: isDeleteSuccess }] = userAPI.useDeleteMutation();

  const form = useForm({
    defaultValues: new UserSchema(),
    resolver: yupResolver(UserSchema.validationSchema)
  });
  const { handleSubmit, formState, control } = form;

  useEffect(() => {
    if (user) {
      form.setValue('name', user.name);
      form.setValue('email', user.email);
      form.setValue('gender', user.gender);
      form.setValue('status', user.status);
    }
  }, [user]);

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
    if (user) {
      deleteUser(user.id);
    }
  };

  return (
    <React.Fragment>
      <ScrollView>
        <AppText
          variant='large'
          style={style.title}
          testID='title'>
          {id ? translate('TEXT_EDIT') : translate('TEXT_CREATE')}
        </AppText>
        <InputFormGroup
          label={translate('TEXT_EMAIL')}
          name='email'
          autoCapitalize='none'
          keyboardType='email-address'
          control={control}
          testID='email-input'
        />
        <InputFormGroup
          label={translate('TEXT_NAME')}
          name='name'
          control={control}
          testID='name-input' />
        <InputFormGroup
          label={translate('TEXT_GENDER')}
          name='gender'
          control={control}
          testID='gender-input' />
        <InputFormGroup
          label={translate('TEXT_STATUS')}
          name='status'
          control={control}
          testID='status-input' />
        {!!error && (
          <AppText style={style.error}>
            {translate('TEXT_ERROR')}: {JSON.stringify(error)}
          </AppText>
        )}
        {(isCreateSuccess || isUpdateSuccess) && (
          <AppText style={style.success} testID='success-message'>
            {translate('TEXT_SUCCESS')}
          </AppText>
        )}
        <View style={style.footer}>
          {!!id && (
            <AppButton
              isLoading={isDeleting}
              label={translate('BUTTON_DELETE')}
              onPress={deleteButtonPressed}
              style={[style.button, style.deleteButton]}
              theme='secondary'
              testID='delete-button'
            />
          )}
          <AppButton
            isLoading={isCreating || isUpdating}
            disabled={!formState.isValid && formState.submitCount > 0}
            label={translate('BUTTON_SAVE')}
            onPress={handleSubmit(formSubmitted)}
            style={style.button}
            testID='save-button'
          />
        </View>
      </ScrollView>
    </React.Fragment>
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
