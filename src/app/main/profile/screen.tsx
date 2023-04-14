import React, { ReactElement } from 'react';
import { AppActivityIndicator } from '@shared/activity-indicator';
import { AppButton } from '@shared/button';
import { AppScreen } from '@shared/screen';
import { AppText } from '@shared/text';
import { commonStyle, createStyles } from '@styles';
import { useTranslation } from '../../../libs/shared/utils/i18n';
import { profileScreenFacade } from './facade';

export function ProfileScreen(): ReactElement {
  const { profile, logout } = profileScreenFacade;
  const translate = useTranslation('MAIN.PROFILE');

  return (
    <AppScreen style={[commonStyle.container, style.container]} testID='profile-screen'>
      {profile ? (
        <AppText variant='largest'>{translate('TEXT_GREETING', { name: profile?.name })}</AppText>
      ) : (
        <AppActivityIndicator />
      )}
      <AppButton label={translate('BUTTON_LOGOUT')} onPress={logout} />
    </AppScreen>
  );
}

const style = createStyles({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});
