import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import { rootReducer } from './reducer';
import { storeRef } from './store-ref';

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    useDispatch: () => store.dispatch,
    useGetState: () => store.getState
  }
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

storeRef.dispatch = store.dispatch;
storeRef.getState = store.getState;

export type AppState = ReturnType<typeof store.getState>;
