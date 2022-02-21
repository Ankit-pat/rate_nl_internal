import { combineReducers } from "redux"
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../reducers/usersreducer'
import {
  persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'persist-root',
  storage,
}

const reducers = combineReducers({
  users: usersReducer
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