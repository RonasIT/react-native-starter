import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { AppText } from '@shared/text';
import { createStyles } from '@styles';
import { useTranslation } from '../../../libs/shared/utils/i18n';

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
