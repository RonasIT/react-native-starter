import { AnyAction } from 'deox';
import { Epic } from 'redux-observable';
import { AppState } from '../store';

export type Epics = { [key: string]: Epic<AnyAction, AnyAction, AppState> };
