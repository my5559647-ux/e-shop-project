import { createReducer } from "@reduxjs/toolkit";

// Initial State layer mapping LocalStorage
const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state, action) => {
      const item = action.payload;
      // Donon keys (_id aur id) check karein taake exact product trace ho jaye aur purane safe rahein!
      const isItemExist = state.cart.find(
        (i) => (i._id || i.id) === (item._id || item.id)
      );

      if (isItemExist) {
        state.cart = state.cart.map((i) =>
          (i._id || i.id) === (isItemExist._id || isItemExist.id) ? item : i
        );
      } else {
        state.cart.push(item);
      }
    })
    .addCase("removeFromCart", (state, action) => {
      // Direct clean payload id filtering match layers
      state.cart = state.cart.filter(
        (i) => (i._id || i.id) !== action.payload
      );
    });
});