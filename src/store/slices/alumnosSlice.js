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

export const updateAsistencia = createAsyncThunk('alumnos/updateAsistencia', async ({ id, cumpleAsistencia }) => {
  try {
    const response = await api.put(`/alumnos/asistencia/${id}`, { cumpleAsistencia })
     return {
       id,
       cumpleAsistencia: response.data
    };
  } catch (error) {
    console.error('Error actualizando la asistencia:', error)
    throw error
  }
})

export const updateAlumno = createAsyncThunk('alumnos/updateAlumno', async ({ id, alumno }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/alumnos/${id}`, alumno)
    return response.data
  } catch (error) {
    console.error('Error actualizando el estudiante:', error)
    return rejectWithValue(
      error.response?.data?.message || 'No se pudo actualizar el alumno.',
    )
  }
})

export const addAlumno = createAsyncThunk('alumnos/addAlumno', async (alumno, { rejectWithValue }) => {
  try {
    const response = await api.post('/alumnos', alumno)
    return response.data
  } catch (error) {
    console.error('Error añadiendo el estudiante:', error)
    return rejectWithValue(
      error.response?.data?.message || 'No se pudo crear el alumno.',
    )
  }
})

const alumnosSlice = createSlice({
  name: 'alumnos',
  initialState,
  reducers: {},
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

      .addCase(updateAsistencia.pending, (state) => {
        // Aquí puedes manejar el estado de carga si lo deseas
      })
      .addCase(updateAsistencia.fulfilled, (state, action) => {
        const index = state.items.findIndex((student) => student.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            cumpleAsistencia: action.payload.cumpleAsistencia,
          }
        }
      })
      .addCase(updateAlumno.fulfilled, (state, action) => {
        const index = state.items.findIndex((student) => student.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(updateAlumno.rejected, (state, action) => {
        console.error('Error al actualizar el estudiante:', action.error.message)
      })
      .addCase(addAlumno.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(addAlumno.rejected, (state, action) => {
        console.error('Error al añadir el estudiante:', action.error.message)
      })
  }
})

export const { updateStudent, addStudent } = alumnosSlice.actions
export default alumnosSlice.reducer
