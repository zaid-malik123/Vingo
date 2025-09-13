import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  currentCity: null,
  currentState: null,
  currentAddress: null,
  shopsInMyCity: null,
  itemsInMyCity: null
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
  },
});

export const { setUserData, setCity, setState, setAddress, setShopsInMyCity, setItemsInMyCity } = userSlice.actions;

export default userSlice.reducer;
