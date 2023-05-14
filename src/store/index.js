import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import postsReducer from "./postsSlice";
import userReducer from "./userSlice";
import categorySlice from "./categorySlice";

// what is the root store?
// the store that holds all the reducers

// what are reducers?
// reducers are functions that take in the state and action and return a new state

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
  categories: categorySlice,
});

// these are used to persist the state
const persistedReducer = persistReducer(persistConfig, rootReducer);

// the store that holds all the reducers and the middleware.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
