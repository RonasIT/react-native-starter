import { RouteProp } from '@react-navigation/native';
import React, { ReactElement, useEffect, useState } from 'react';
import { LocalAuthActions } from '@shared/local-auth';
import { localAuthService } from '@shared/local-auth/service';
import { PinForm } from '@shared/pin-form/component';
import { storeRef } from '@store';
import { AccountAccessNavigationParams } from '../navigation';

const pinLength = 4;

export function PinScreen(props: { route: RouteProp<AccountAccessNavigationParams, 'Pin'> }): ReactElement {
  const isPinSet = props?.route?.params?.isPinSet;
  const [inputValue, setInputValue] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [hasError, setHasError] = useState(false);
  const confirmMode = !isPinSet && inputValue.length === pinLength;

  const checkPinCode = async (): Promise<void> => {
    const isCorrect = await localAuthService.checkPin(inputValue);
    isCorrect ? storeRef.dispatch(LocalAuthActions.localAuthSuccess()) : setHasError(true);
  };

  const handleError = (): void => {
    setInputValue('');
    setConfirmPin('');
    setHasError(false);
  };

  useEffect(() => {
    if (inputValue.length === pinLength && isPinSet) {
      checkPinCode();
    }
    if (confirmMode && confirmPin.length === pinLength) {
      confirmPin === inputValue ? storeRef.dispatch(LocalAuthActions.setPin({ pin: confirmPin })) : setHasError(true);
    }
  }, [inputValue, confirmPin]);

  return (
    <PinForm
      hasError={hasError}
      handleError={handleError}
      pinLength={pinLength}
      value={confirmMode ? confirmPin : inputValue}
      onValueChange={confirmMode ? setConfirmPin : setInputValue}
      title={isPinSet ? 'Enter Pin' : confirmMode ? 'Confirm Pin' : 'Set Pin'}
      isPinSet={isPinSet}
    />
  );
}
