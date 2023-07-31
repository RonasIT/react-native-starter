import React, { ReactElement } from 'react';
import { ProfileDetails } from '@libs/profile/features/details';
import { commonStyle, createStyles } from '@libs/shared/ui/styles';
import { AppScreen } from '@libs/shared/ui/ui-kit/screen';

export function ProfileScreen(): ReactElement {
  return (
    <AppScreen style={[commonStyle.container, style.container]} testID='profile-screen'>
      <ProfileDetails />
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
