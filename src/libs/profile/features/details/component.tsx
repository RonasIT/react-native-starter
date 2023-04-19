import React, { ReactElement } from 'react';
import { useTranslation } from '@shared/features/i18n';
import { AppActivityIndicator } from '@shared/ui/ui-kit/activity-indicator';
import { AppButton } from '@shared/ui/ui-kit/button';
import { AppText } from '@shared/ui/ui-kit/text';
import { profileDetailsFacade } from './facade';

export function ProfileDetails(): ReactElement {
  const { profile, logout } = profileDetailsFacade;
  const translate = useTranslation('PROFILE.DETAILS');

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
