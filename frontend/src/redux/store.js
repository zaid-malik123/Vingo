import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './userSlice'
import  ownerSlice  from './ownerSlice'
export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    ownerSlice: ownerSlice
  },
})