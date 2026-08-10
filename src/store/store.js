import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import modalReducer from './slices/modalSlice'
import alumnosReducer from './slices/alumnosSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    alumnos: alumnosReducer,
    ui: uiReducer,
  },
})
