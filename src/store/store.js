import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, persistStore, PURGE,
  REGISTER, REHYDRATE
} from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';
import audioReducer from "../reducers/audioReducer";

const persistConfig = {
  key: 'persist-root',
  storage: storageSession,
}

const reducers = combineReducers({
  audio: audioReducer
})

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

const persistor = persistStore(store);
export { persistor };

export default store;