import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   shop : null,
}

export const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    setMyShopData: (state, action)=>{
      state.shop = action.payload
    }
  },
})

export const { setMyShopData } = ownerSlice.actions

export default ownerSlice.reducer