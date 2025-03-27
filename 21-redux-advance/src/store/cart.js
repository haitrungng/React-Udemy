import { createSlice } from "@reduxjs/toolkit";

// items: title, price, description, quantity, id
const initialState = {
  items: [],
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      state.changed = true;
      // action.payload is the product
      if (state.items.some((item) => item.title === action.payload.title)) {
        state.items.map((item) => {
          if (item.title === action.payload.title) {
            item.quantity++;
          }
          return item;
        });
      } else state.items.push({ ...action.payload, quantity: 1 });
    },
    removeItem(state, action) {
      state.changed = true;
      const item = state.items.find(
        (item) => item.title === action.payload.title
      );
      if (item.quantity > 1) {
        item.quantity--;
      } else
        state.items = state.items.filter(
          (item) => item.title !== action.payload.title
        );
    },
    replaceCart(state, action) {
      if (action.payload.items.length === 0) state.items = [];
      else state.items = action.payload.items;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
