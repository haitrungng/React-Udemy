import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpenCart: false };

const userProgressSlice = createSlice({
  name: "userProgress",
  initialState: initialState,
  reducers: {
    toggleOpenCart(state) {
      state.isOpenCart = !state.isOpenCart;
    },
  },
});

export default userProgressSlice.reducer;
export const userProgressActions = userProgressSlice.actions;
