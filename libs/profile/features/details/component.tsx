import { AuthActions } from '@libs/shared/data-access/api/auth/store';
import { profileAPI } from '@libs/shared/data-access/api/profile/api';
import { useTranslation } from '@libs/shared/features/i18n';
import { AppActivityIndicator } from '@libs/shared/ui/ui-kit/activity-indicator';
import { AppButton } from '@libs/shared/ui/ui-kit/button';
import { AppText } from '@libs/shared/ui/ui-kit/text';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

export function ProfileDetails(): ReactElement {
  const { data: profile } = profileAPI.useGetDemoQuery();
  const translate = useTranslation('PROFILE.DETAILS');
  const dispatch = useDispatch();

  const logout = (): void => {
    dispatch(AuthActions.unauthorize({}));
  };

  return (
    <>
      {profile ? (
        <AppText variant='largest'>{translate('TEXT_GREETING', { name: profile?.name })}</AppText>
      ) : (
        <AppActivityIndicator />
      )}
      <AppButton label={translate('BUTTON_LOGOUT')} onPress={logout} />
    </>
  );
}
