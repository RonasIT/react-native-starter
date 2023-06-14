import { configureStore, MiddlewareArray, Reducer, StateFromReducersMapObject } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { OmitIndexSignature } from 'type-fest';
import { authAPI } from '@libs/shared/data-access/api/auth/api';
import { profileAPI } from '@libs/shared/data-access/api/profile/api';
import { userApi } from '@libs/shared/data-access/api/user/api';
import { rootEpic } from './epics';
import { rootReducer } from './reducer';

export function createStore(context?: unknown): typeof store {
  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      useDispatch: () => store.dispatch,
      useGetState: () => store.getState
    }
  });

  const middlewares = [epicMiddleware, userApi.middleware, authAPI.middleware, profileAPI.middleware];

  if (__DEV__ && !process.env.NO_FLIPPER) {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
  }

  const store = configureStore({
    reducer: rootReducer as unknown as Reducer<StateFromReducersMapObject<OmitIndexSignature<typeof rootReducer>>>,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, thunk: { extraArgument: context } }).concat(
      middlewares
    ) as MiddlewareArray<any>
  });

  epicMiddleware.run(rootEpic);

  return store;
}
