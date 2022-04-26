import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import { storeRef } from './store-ref';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    useDispatch: () => store.dispatch,
    useGetState: () => store.getState
  }
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(epicMiddleware)
});

epicMiddleware.run(rootEpic);

storeRef.dispatch = store.dispatch;
storeRef.getState = store.getState;

export type AppState = ReturnType<typeof store.getState>;
