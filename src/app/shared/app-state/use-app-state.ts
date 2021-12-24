import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export const useAppState = (onChangeState?: (state: AppStateStatus) => void): AppStateStatus => {
  const [nextState, setNextState] = useState<AppStateStatus>('active');

  function handleStateChange(state: AppStateStatus): void {
    setNextState(state);
    onChangeState?.(state);
  }

  useEffect(() => {
    AppState.addEventListener('change', handleStateChange);

    return () => {
      AppState.removeEventListener('change', handleStateChange);
    };
  }, []);

  return nextState;
};
