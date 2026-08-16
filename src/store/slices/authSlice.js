import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

const decodeToken = (token) => {
  if (!token) return null

  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return decoded
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { username, password })
      const { token } = response.data

      if (!token) {
        return rejectWithValue('No se recibió token del backend.')
      }

      const user = decodeToken(token)
      localStorage.setItem('sae_token', token)
      return { token, user }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Credenciales inválidas o error del servidor.',
      )
    }
  },
)

const initialToken = localStorage.getItem('sae_token') || null
const decodedToken = decodeToken(initialToken)

const initialState = {
  token: initialToken,
  user: decodedToken,
  isAuthenticated: Boolean(initialToken && decodedToken),
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('sae_token')
      state.token = null
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    hydrateAuthFromToken: (state) => {
      const token = localStorage.getItem('sae_token')
      const user = decodeToken(token)

      state.token = token
      state.user = user
      state.isAuthenticated = Boolean(token && user)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload.user || decodeToken(action.payload.token)

        state.token = action.payload.token
        state.user = user
        state.isAuthenticated = Boolean(user)
        state.isLoading = false
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Ocurrió un error al iniciar sesión.'
      })
  },
})

export const { logout, hydrateAuthFromToken } = authSlice.actions
export default authSlice.reducer
