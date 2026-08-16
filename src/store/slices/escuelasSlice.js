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

export const finalizarAsistencia = createAsyncThunk(
  'escuelas/finalizarAsistencia',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(`/escuelas/${id}/cerrar-asistencia`)
      return response.data
    } catch (error) {
      console.error('Error al finalizar la asistencia:', error)
      return rejectWithValue(
        error.response?.data?.message || 'No se pudo finalizar la asistencia.',
      )
    }
  });

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
      .addCase(finalizarAsistencia.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(finalizarAsistencia.fulfilled, (state, action) => {
        state.escuela =
          action.payload && typeof action.payload === 'object'
            ? { ...state.escuela, ...action.payload, asistenciaCompletada: true }
            : { ...state.escuela, asistenciaCompletada: true }
        state.loading = false
      })
      .addCase(finalizarAsistencia.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Error al finalizar la asistencia.'
      })
  },
})

export default escuelasSlice.reducer
