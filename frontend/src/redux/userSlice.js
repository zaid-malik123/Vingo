import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  currentCity: null,
  currentState: null,
  currentAddress: null,
  shopsInMyCity: null,
  itemsInMyCity: null,
  cartItems: [],
  myOrders: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setState: (state, action) => {
      state.currentState = action.payload;
    },
    setAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setShopsInMyCity: (state, action) => {
      state.shopsInMyCity = action.payload;
    },
    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },

    // ✅ Add to Cart
    addToCart: (state, action) => {
      const cartItem = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === cartItem.id);

      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push({ ...cartItem, quantity: cartItem.quantity || 1 });
      }
    },

    // ✅ Decrease Quantity
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // agar quantity 1 thi, remove kar do
          state.cartItems = state.cartItems.filter((i) => i.id !== itemId);
        }
      }
    },

    // ✅ Remove from Cart
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.id !== itemId);
    },

    setMyOrders: (state, action)=>{
     state.myOrders = action.payload
    },
    addMyOrder: (state, action)=>{
     state.myOrders = [action.payload,...state.myOrders]
    }
  },
});

export const {
  setUserData,
  setCity,
  setState,
  setAddress,
  setShopsInMyCity,
  setItemsInMyCity,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  setMyOrders,
  addMyOrder
} = userSlice.actions;

export default userSlice.reducer;
