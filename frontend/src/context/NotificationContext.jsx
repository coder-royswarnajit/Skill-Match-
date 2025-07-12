import { createContext, useContext, useReducer, useEffect } from 'react'
import { useAuth } from './AuthContext'

const NotificationContext = createContext()

const initialState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter(n => !n.isRead).length
      }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1
      }
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n._id === action.payload ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      }
    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, isRead: true })),
        unreadCount: 0
      }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)
  const { user } = useAuth()

  // Load notifications when user is authenticated
  useEffect(() => {
    if (user) {
      // loadNotifications()
    }
  }, [user])

  const loadNotifications = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      // const response = await notificationService.getNotifications()
      // dispatch({ type: 'SET_NOTIFICATIONS', payload: response.data.data })
    } catch (error) {
      console.error('Failed to load notifications:', error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const markAsRead = async (notificationId) => {
    try {
      // await notificationService.markAsRead(notificationId)
      dispatch({ type: 'MARK_AS_READ', payload: notificationId })
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      // await notificationService.markAllAsRead()
      dispatch({ type: 'MARK_ALL_AS_READ' })
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error)
    }
  }

  const addNotification = (notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
  }

  const value = {
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    isLoading: state.isLoading,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    addNotification
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
} 