import { configureStore } from '@reduxjs/toolkit'
import SignSliceReducer from './slice/SignSlice'

export default configureStore({
  reducer: {
    sign: SignSliceReducer
  }
})
