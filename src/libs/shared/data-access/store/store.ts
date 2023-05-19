import { configureStore, MiddlewareArray, Reducer, StateFromReducersMapObject } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { OmitIndexSignature } from 'type-fest';
import { userApi } from '@libs/shared/data-access/api/user/api';
import { rootEpic } from './epics';
import { rootReducer } from './reducer';
import { storeRef } from './store-ref';

export function createStore(context?: unknown): typeof store {
  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      useDispatch: () => store.dispatch,
      useGetState: () => store.getState
    }
  });

  const store = configureStore({
    reducer: rootReducer as unknown as Reducer<StateFromReducersMapObject<OmitIndexSignature<typeof rootReducer>>>,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, thunk: { extraArgument: context } }).concat(
      epicMiddleware,
      userApi.middleware
    ) as MiddlewareArray<any>
  });

  epicMiddleware.run(rootEpic);

  storeRef.dispatch = store.dispatch;
  storeRef.getState = store.getState;

  return store;
}
