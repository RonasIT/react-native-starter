import { range } from 'lodash';
import React, { ReactElement } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from '@shared/icon';
import { LocalAuthActions } from '@shared/local-auth';
import { AppText } from '@shared/text';
import { storeRef } from '@store';
import { createStyles } from '@styles';

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  isPinSet?: boolean;
}

export function AuthKeyboard({ value, onValueChange, isPinSet }: Props): ReactElement {
  const handleNumberPress = (number: number): (() => void) => {
    return () => {
      onValueChange(number === null ? value.slice(0, -1) : `${value}${number}`);
    };
  };

  const handleBiometricAuthPress = (): void => {
    storeRef.dispatch(LocalAuthActions.authenticate());
  };

  return (
    <View>
      <View style={style.numbersContainer}>
        {range(1, 10).map((number) => (
          <TouchableOpacity
            style={style.number}
            onPress={handleNumberPress(number)}
            key={number}>
            <AppText variant='medium'>{number}</AppText>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={handleBiometricAuthPress} style={style.number}>
          {isPinSet && <Icon name='faceID' />}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNumberPress(0)} style={style.number}>
          <AppText variant='medium'>0</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNumberPress(null)} style={style.number}>
          <Icon stroke='white' name='keyboardBack' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = createStyles({
  numbersContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center'
  },
  number: {
    width: '33.3%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
