import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../services/api';

const initialState = {
  items: [],
  page: 0,
  size: 20,
  totalElements: 0,
  totalPages: 0,
  loading: false,
  error: null
};

export const getAlumnos = createAsyncThunk('alumnos/getAlumnos', async (page = 0) => {
  try {
    const response = await api.get('/alumnos', {
      params: {
        page,
        size: 20
      }
    })
    return response.data
  } catch (error) {
    console.error('Error cargando los estudiantes:', error)
    throw error
  }
});

export const getAlumnosByEscuelaId = createAsyncThunk('alumnos/getAlumnosByEscuelaId', async (escuelaId) => {
  try {
    const response = await api.get(`/alumnos/escuela/${escuelaId}`)
    return response.data
  } catch (error) {
    console.error('Error cargando los estudiantes:', error)
    throw error
  }
});

const alumnosSlice = createSlice({
  name: 'alumnos',
  initialState,
  reducers: {
    updateStudent: (state, action) => {
      const index = state.findIndex((student) => student.id === action.payload.id)

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload,
        }
      }
    },
    addStudent: (state, action) => {
      state.push({
        id: Date.now(),
        ...action.payload,
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlumnos.pending, (state) => {
        // Aquí puedes manejar el estado de carga si lo deseas
      })
      .addCase(getAlumnos.fulfilled, (state, action) => {
        state.items = action.payload.content;
        state.page = action.payload.number;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(getAlumnos.rejected, (state, action) => {
        console.error('Error al obtener los estudiantes:', action.error.message)
      })
      .addCase(getAlumnosByEscuelaId.pending, (state) => {
        // Aquí puedes manejar el estado de carga si lo deseas
      })
      .addCase(getAlumnosByEscuelaId.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getAlumnosByEscuelaId.rejected, (state, action) => {
        console.error('Error al obtener los estudiantes:', action.error.message)
      })
  }
})

export const { updateStudent, addStudent } = alumnosSlice.actions
export default alumnosSlice.reducer
