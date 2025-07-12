import { createContext, useContext, useReducer, useEffect } from 'react'
import { authService } from '../services/auth'

const AuthContext = createContext()

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: true,
  error: null
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        error: null
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        error: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        error: null
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (state.token) {
        try {
          dispatch({ type: 'AUTH_START' })
          const response = await authService.getMe()
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user: response.data.user, token: state.token }
          })
        } catch (error) {
          dispatch({ type: 'AUTH_FAILURE', payload: error.message })
          localStorage.removeItem('token')
        }
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: null })
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    try {
      dispatch({ type: 'AUTH_START' })
      const response = await authService.login(credentials)
      const { user, token } = response.data.data
      
      localStorage.setItem('token', token)
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } })
      return { success: true }
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.response?.data?.message || 'Login failed' })
      return { success: false, error: error.response?.data?.message || 'Login failed' }
    }
  }

  const register = async (userData) => {
    try {
      dispatch({ type: 'AUTH_START' })
      const response = await authService.register(userData)
      const { user, token } = response.data.data
      
      localStorage.setItem('token', token)
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } })
      return { success: true }
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.response?.data?.message || 'Registration failed' })
      return { success: false, error: error.response?.data?.message || 'Registration failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData })
  }

  const value = {
    user: state.user,
    token: state.token,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 