import { AppActivityIndicator } from '@shared/activity-indicator';
import { AppButton } from '@shared/button';
import { useTranslation } from '@shared/i18n';
import { AppScreen } from '@shared/screen';
import { AppText, TextTheme } from '@shared/text';
import { commonStyle, createStyles } from '@styles';
import React, { ReactElement } from 'react';
import { profileScreenFacade } from './facade';

export function ProfileScreen(): ReactElement {
  const { profile, logout } = profileScreenFacade;
  const translate = useTranslation('MAIN.PROFILE');

  return (
    <AppScreen style={[commonStyle.container, style.container]}>
      {profile ? (
        <AppText theme={TextTheme.LARGEST}>{translate('TEXT_GREETING', { name: profile?.name })}</AppText>
      ) : (
        <AppActivityIndicator />
      )}
      <AppButton title={translate('BUTTON_LOGOUT')} onPress={logout} />
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
