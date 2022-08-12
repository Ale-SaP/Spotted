import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchRedux/searchSlice'

export const store = configureStore({
    reducer:{
       search: searchReducer,
       
    }
  })