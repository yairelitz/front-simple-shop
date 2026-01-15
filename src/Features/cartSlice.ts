import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/types";
type cartItems = Product;

type ProductState = {
  items: cartItems[];
};

const initialState: ProductState = {
    items: []
};

const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItems>) => {
      state.items.push(action.payload);
    },
    removeOneFromCart: (state, action: PayloadAction<number>) => {
  const index = state.items.findIndex(item => item._id === action.payload);
  if (index >= 0) {
    state.items.splice(index, 1);
  }
},
    clearCart: (state) => {
      state.items = [];
    },
  },
});
export const { addToCart, removeOneFromCart, clearCart } = productSlice.actions;
export default productSlice.reducer;
