import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { useTranslation } from '../../../features/i18n';
import { createStyles } from '../../styles';
import { AppText } from '../text';

interface Props {
  title?: string;
}
export function ItemsListEmptyState({ title }: Props): ReactElement {
  const translate = useTranslation('SHARED.ITEMS_LIST_EMPTY_STATE');

  return (
    <View style={style.container}>
      <AppText>{title || translate('TEXT_NO_ITEMS')}</AppText>
    </View>
  );
}

const style = createStyles({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
