import { createReducer } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

// Reducer using builder callback
export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    // 1. Add to Wishlist Case (Fixed id logic)
    .addCase("addToWishlist", (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i.id === item.id);

      if (isItemExist) {
        state.wishlist = state.wishlist.map((i) =>
          i.id === isItemExist.id ? item : i
        );
      } else {
        state.wishlist.push(item);
      }
    })
    // 2. Remove from Wishlist Case (Fixed id logic)
    .addCase("removeFromWishlist", (state, action) => {
      state.wishlist = state.wishlist.filter(
        (i) => (i._id || i.id) !== action.payload
      );
    });
});