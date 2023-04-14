import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import reactotron from '../../reactotron-config';
import { rootEpic } from './epics';
import { rootReducer } from './reducer';
import { storeRef } from './store-ref';

export function createStore(): typeof store {
  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      useDispatch: () => store.dispatch,
      useGetState: () => store.getState
    }
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(epicMiddleware),
    enhancers: [reactotron.createEnhancer()]
  });

  epicMiddleware.run(rootEpic);

  storeRef.dispatch = store.dispatch;
  storeRef.getState = store.getState;

  return store;
}
