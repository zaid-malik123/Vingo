import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action)=>{
        state.value = action.payload
    }
  },
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer