import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import { rootReducer } from './reducer';

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    useDispatch: () => store.dispatch,
    useGetState: () => store.getState
  }
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

export type AppState = ReturnType<typeof store.getState>;
