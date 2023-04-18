import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export const useAppState = (onChangeState?: (state: AppStateStatus) => void): AppStateStatus => {
  const [nextState, setNextState] = useState<AppStateStatus>('active');

  function handleStateChange(state: AppStateStatus): void {
    setNextState(state);
    onChangeState?.(state);
  }

  useEffect(() => {
    const listener = AppState.addEventListener('change', handleStateChange);

    return () => {
      listener.remove();
    };
  }, []);

  return nextState;
};
