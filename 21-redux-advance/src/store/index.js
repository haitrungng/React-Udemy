import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart";
import userProgressReducer from "./userProgress";

const store = configureStore({
  reducer: { cart: cartReducer, userProgress: userProgressReducer },
});

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
