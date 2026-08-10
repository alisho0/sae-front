import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  escuela: null,
  loading: false,
  error: null,
}

export const traerEscuelaPorId = createAsyncThunk(
  'escuelas/traerEscuelaPorId',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/escuelas/${id}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener la escuela:', error)
      return rejectWithValue(
        error.response?.data?.message || 'No se pudo obtener la escuela.',
      )
    }
  },
)

const escuelasSlice = createSlice({
  name: 'escuelas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(traerEscuelaPorId.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(traerEscuelaPorId.fulfilled, (state, action) => {
        state.escuela = action.payload
        state.loading = false
      })
      .addCase(traerEscuelaPorId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al obtener la escuela.'
      })
  },
})

export default escuelasSlice.reducer
