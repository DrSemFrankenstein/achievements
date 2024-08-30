import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import aboutReducer from "./aboutSlice";
import journalReducer from "./journalSlice";
import todoReducer from "./todoSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  about: aboutReducer,
  journal: journalReducer,
  todo: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
