import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";

// what is the root store?
// the store that holds all the reducers

// what are reducers?
// reducers are functions that take in the state and action and return a new state

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

// these are used to persist the state
const persistedReducer = persistReducer(persistConfig, rootReducer);

// the store that holds all the reducers and the middleware.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
