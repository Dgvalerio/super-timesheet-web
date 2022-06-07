import ui from '@/store/ui/slice';
import user from '@/store/user/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistedReducer = persistReducer(
  {
    key: 'super-timesheet-web',
    storage,
    whitelist: ['ui', 'user'],
    version: 1,
  },
  combineReducers({ ui, user })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const toPersist = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { store, toPersist };
