import { AppText } from '@shared/text';
import { createStyles, variables } from '@styles';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { useTranslation } from '@shared/i18n';

interface Props {
  title?: string;
}
export function ItemsListEmptyState({ title }: Props): ReactElement {
  const translate = useTranslation('SHARED.ITEMS_LIST_EMPTY_STATE');

  return (
    <View style={style.container}>
      <AppText style={style.text}>{title || translate('TEXT_NO_ITEMS')}</AppText>
    </View>
  );
}

const style = createStyles({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: variables.color.white
  }
});
