import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { AuthActions } from '@libs/shared/data-access/api/auth/store';
import { profileAPI } from '@libs/shared/data-access/api/profile/api';
import { useTranslation } from '@libs/shared/features/i18n';
import { AppActivityIndicator } from '@libs/shared/ui/ui-kit/activity-indicator';
import { AppButton } from '@libs/shared/ui/ui-kit/button';
import { AppText } from '@libs/shared/ui/ui-kit/text';

interface ProfileDetailsProps {
  onLogout: () => void;
}

export function ProfileDetails({ onLogout }: ProfileDetailsProps): ReactElement {
  const { data: profile } = profileAPI.useGetDemoQuery();
  const translate = useTranslation('PROFILE.DETAILS');
  const dispatch = useDispatch();

  const logout = (): void => {
    dispatch(AuthActions.unauthorize({}));
    onLogout();
  };

  return (
    <React.Fragment>
      {profile ? (
        <AppText variant='largest'>{translate('TEXT_GREETING', { name: profile?.name })}</AppText>
      ) : (
        <AppActivityIndicator />
      )}
      <AppButton label={translate('BUTTON_LOGOUT')} onPress={logout} />
    </React.Fragment>
  );
}
