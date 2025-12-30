import { createSlice } from "@reduxjs/toolkit";
type counterState = {
  count: number;
};
const initialValue: counterState = {
  count: 0,
};
const counterSlice = createSlice({
  name: "counter",
  initialState: initialValue,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    resetCounter(state) {
      state.count = 0;
    }
  },
});
export const {increment, decrement, resetCounter} = counterSlice.actions;
export default counterSlice.reducer;
