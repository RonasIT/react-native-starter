import React, { ReactElement } from 'react';
import { commonStyle, createStyles } from '../../../libs/shared/ui/styles';
import { AppActivityIndicator } from '../../../libs/shared/ui/ui-kit/activity-indicator';
import { AppButton } from '../../../libs/shared/ui/ui-kit/button';
import { AppScreen } from '../../../libs/shared/ui/ui-kit/screen';
import { AppText } from '../../../libs/shared/ui/ui-kit/text';
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
