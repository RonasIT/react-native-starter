import { useTranslation } from '@libs/shared/features/i18n';
import { createStyles } from '@libs/shared/ui/styles';
import { AppText } from '@libs/shared/ui/ui-kit/text';
import React, { ReactElement } from 'react';
import { View } from 'react-native';

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
