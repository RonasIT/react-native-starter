import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { AppState } from './state';

export type Epics = {
  [key: string]: Epic<
    AnyAction,
    AnyAction,
    AppState,
    {
      useDispatch: () => (action: AnyAction) => void;
      useGetState: () => () => AppState;
    }
  >;
};
