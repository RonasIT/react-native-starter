import { delay, range } from 'lodash';
import { MotiView, useDynamicAnimation } from 'moti';
import React, { ReactElement, useEffect } from 'react';
import { Vibration, View } from 'react-native';
import { AuthKeyboard } from '@shared/auth-keyboard/component';
import { AppScreen } from '@shared/screen';
import { AppText } from '@shared/text';
import { commonStyle, createStyles } from '@styles';

interface Props {
  title: string;
  onValueChange: (value: string) => void;
  handleError: () => void;
  hasError: boolean;
  value: string;
  isPinSet?: boolean;
  pinLength: number;
}

export function PinForm({
  title,
  onValueChange,
  isPinSet,
  value,
  pinLength,
  handleError,
  hasError
}: Props): ReactElement {
  const animation = useDynamicAnimation();

  const handleValueChange = (value: string): void => {
    if (value.length > pinLength || hasError) {
      return;
    } else {
      onValueChange(value);
    }
  };

  useEffect(() => {
    if (hasError) {
      Vibration.vibrate();
      animation.animateTo({
        scale: [1.2, 1],
        backgroundColor: ['red', 'white']
      });
      delay(handleError, 600);
    }
  }, [hasError]);

  return (
    <AppScreen style={[commonStyle.container, style.container]}>
      <View style={style.valueItemsContainer}>
        {range(1, pinLength + 1).map((item, index) => (
          <MotiView
            state={animation}
            key={String(item)}
            style={[style.valueItem, !!value[index] && style.filledValueItem]}
          />
        ))}
      </View>
      <AppText>{title}</AppText>
      <AuthKeyboard
        value={value}
        onValueChange={handleValueChange}
        isPinSet={isPinSet} />
    </AppScreen>
  );
}

const style = createStyles({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  valueItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  valueItem: {
    marginHorizontal: 10,
    width: 20,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  filledValueItem: {
    backgroundColor: 'blue'
  }
});
