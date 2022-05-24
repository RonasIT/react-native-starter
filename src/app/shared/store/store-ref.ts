import { Store } from '@reduxjs/toolkit';
import { AppState } from './types';

export const storeRef = {} as Pick<Store<AppState>, 'dispatch' | 'getState'>;
