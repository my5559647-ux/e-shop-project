// add to cart
export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToCart",
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart
export const removeFromCart = (itemId) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: itemId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return itemId;
};