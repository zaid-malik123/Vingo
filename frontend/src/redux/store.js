import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './userSlice'
import  ownerSlice  from './ownerSlice'
import  mapSlice  from './mapSlice'
export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    ownerSlice: ownerSlice,
    mapSlice: mapSlice
  },
})