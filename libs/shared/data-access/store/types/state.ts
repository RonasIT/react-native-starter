import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createStore } from '../store';

export type AppState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ThunkDispatch<AppState & Record<any, any>, any, Action>;
