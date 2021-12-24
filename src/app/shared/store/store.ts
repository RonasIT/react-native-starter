import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import thunkMiddleware from 'redux-thunk';
import { rootEpic } from './epics';
import { rootReducer } from './reducer';

const epicMiddleware = createEpicMiddleware();

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware, epicMiddleware)));

epicMiddleware.run(rootEpic);

export type AppState = ReturnType<typeof store.getState>;
