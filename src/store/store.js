import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { notesSlice } from "./notes/notesSlice"



export const store = configureStore({
  reducer: {

    auth: authSlice.reducer,
    notes: notesSlice.reducer,
 
  },
})