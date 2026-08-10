import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  type: null,
  payload: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.type = action.payload.type
      state.payload = action.payload.payload
    },
    closeModal: () => initialState,
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
