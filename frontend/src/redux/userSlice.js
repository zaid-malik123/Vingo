import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  city: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action)=>{
        state.user = action.payload
    },
    setCity: (state, action)=>{
        state.city = action.payload
    }
  },
})

export const { setUserData, setCity } = userSlice.actions

export default userSlice.reducer