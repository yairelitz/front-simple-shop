import { configureStore } from "@reduxjs/toolkit"
import  cartReducer  from "./Features/cartSlice"
import counterReducer from "./Features/counterSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;