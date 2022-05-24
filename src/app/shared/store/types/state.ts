import { createStore } from '../store';

export type AppState = ReturnType<ReturnType<typeof createStore>['getState']>;
