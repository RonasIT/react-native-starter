import { yupResolver } from '@hookform/resolvers/yup';
import { RouteProp } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { merge } from 'lodash';
import React, { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Keyboard } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { EntityPartial } from '@shared/base-entity/types';
import { AppButton } from '@shared/button';
import { useTranslation } from '@shared/i18n';
import { InputFormGroup } from '@shared/input-form-group';
import { AppScreen } from '@shared/screen';
import { AppText } from '@shared/text';
import { User, userPromiseService } from '@shared/user';
import { colors, commonStyle, createStyles } from '@styles';
import { HomeNavigationParams } from '../navigation';
import { UserForm } from './shared/forms';
import { UserScreenActions } from './shared/store';

export function UserScreen(props: { route: RouteProp<HomeNavigationParams, 'User'> }): ReactElement {
  const id = props.route.params?.id;
  const translate = useTranslation('MAIN.USER');
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userPromiseService.get(id),
    enabled: !!id,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', id], (oldData) => merge(oldData, data));
    }
  });

  const {
    mutate: createMutate,
    isLoading: isCreating,
    isSuccess: isCreateSuccess,
    error
  } = useMutation<User, unknown, User>({
    mutationFn: (user) => userPromiseService.create(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const {
    mutate: updateMutate,
    isLoading: isUpdating,
    isSuccess: isUpdateSuccess
  } = useMutation<EntityPartial<User>, unknown, EntityPartial<User>>({
    mutationFn: (user) => userPromiseService.update(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    }
  });

  const {
    mutate: deleteMutate,
    isLoading: isDeleting,
    isSuccess: isDeleteSuccess
  } = useMutation<void, unknown, number>({
    mutationFn: (id) => userPromiseService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const form = useForm({
    defaultValues: new UserForm(),
    resolver: yupResolver(UserForm.validationSchema)
  });
  const { handleSubmit, formState, control } = form;

  if (user) {
    form.setValue('name', user.name);
    form.setValue('email', user.email);
    form.setValue('gender', user.gender);
    form.setValue('status', user.status);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (isDeleteSuccess) {
      dispatch(UserScreenActions.userDeleteSuccess());
    }
  }, [isDeleteSuccess]);

  const formSubmitted = (values: UserForm): void => {
    if (id) {
      updateMutate(new User({ id, ...values }));
    } else {
      createMutate(new User(values));
    }
  };

  const deleteButtonPressed = (): void => {
    deleteMutate(user.id);
  };

  return (
    <AppScreen style={commonStyle.container}>
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
    </AppScreen>
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
