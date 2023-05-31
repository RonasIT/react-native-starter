import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '@libs/shared/data-access/auth';
import { ProfileSelectors } from '@libs/shared/data-access/profile';
import { useTranslation } from '@libs/shared/features/i18n';
import { AppActivityIndicator } from '@libs/shared/ui/ui-kit/activity-indicator';
import { AppButton } from '@libs/shared/ui/ui-kit/button';
import { AppText } from '@libs/shared/ui/ui-kit/text';

export function ProfileDetails(): ReactElement {
  const profile = useSelector(ProfileSelectors.profile);
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
