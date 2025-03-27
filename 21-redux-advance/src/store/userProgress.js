import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpenCart: false, notification: null };

const userProgressSlice = createSlice({
  name: "userProgress",
  initialState: initialState,
  reducers: {
    toggleOpenCart(state) {
      state.isOpenCart = !state.isOpenCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    hideNotification(state) {
      state.notification = null;
    },
  },
});

export default userProgressSlice.reducer;
export const userProgressActions = userProgressSlice.actions;
