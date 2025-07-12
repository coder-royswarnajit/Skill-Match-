import { createContext, useContext, useReducer, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ProfileContext = createContext()

const initialState = {
  profile: null,
  isLoading: false,
  error: null
}

const profileReducer = (state, action) => {
  switch (action.type) {
    case 'PROFILE_LOADING':
      return { ...state, isLoading: true, error: null }
    case 'PROFILE_SUCCESS':
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
        error: null
      }
    case 'PROFILE_FAILURE':
      return {
        ...state,
        profile: null,
        isLoading: false,
        error: action.payload
      }
    case 'PROFILE_UPDATE':
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
        isLoading: false
      }
    case 'SKILL_ADD':
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.payload.type]: [...state.profile[action.payload.type], action.payload.skill]
        }
      }
    case 'SKILL_REMOVE':
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.payload.type]: state.profile[action.payload.type].filter(
            skill => skill._id !== action.payload.skillId
          )
        }
      }
    default:
      return state
  }
}

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState)
  const { user, token } = useAuth()

  // Load profile when user is authenticated
  useEffect(() => {
    if (user && token) {
      loadProfile()
    }
  }, [user, token])

  const loadProfile = async () => {
    try {
      dispatch({ type: 'PROFILE_LOADING' })
      const response = await profileService.getProfile()
      dispatch({ type: 'PROFILE_SUCCESS', payload: response.data.data })
    } catch (error) {
      dispatch({ type: 'PROFILE_FAILURE', payload: error.response?.data?.message || 'Failed to load profile' })
    }
  }

  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: 'PROFILE_LOADING' })
      const response = await profileService.updateProfile(profileData)
      dispatch({ type: 'PROFILE_UPDATE', payload: response.data.data })
      return { success: true }
    } catch (error) {
      dispatch({ type: 'PROFILE_FAILURE', payload: error.response?.data?.message || 'Failed to update profile' })
      return { success: false, error: error.response?.data?.message || 'Failed to update profile' }
    }
  }

  const addSkill = async (skillData) => {
    try {
      dispatch({ type: 'PROFILE_LOADING' })
      const response = await profileService.addSkill(skillData)
      dispatch({ type: 'SKILL_ADD', payload: { type: skillData.type === 'offered' ? 'skillsOffered' : 'skillsWanted', skill: response.data.data } })
      return { success: true }
    } catch (error) {
      dispatch({ type: 'PROFILE_FAILURE', payload: error.response?.data?.message || 'Failed to add skill' })
      return { success: false, error: error.response?.data?.message || 'Failed to add skill' }
    }
  }

  const removeSkill = async (skillId, type) => {
    try {
      dispatch({ type: 'PROFILE_LOADING' })
      await profileService.removeSkill(skillId)
      dispatch({ type: 'SKILL_REMOVE', payload: { skillId, type: type === 'offered' ? 'skillsOffered' : 'skillsWanted' } })
      return { success: true }
    } catch (error) {
      dispatch({ type: 'PROFILE_FAILURE', payload: error.response?.data?.message || 'Failed to remove skill' })
      return { success: false, error: error.response?.data?.message || 'Failed to remove skill' }
    }
  }

  const uploadPhoto = async (file) => {
    try {
      dispatch({ type: 'PROFILE_LOADING' })
      const response = await profileService.uploadPhoto(file)
      dispatch({ type: 'PROFILE_UPDATE', payload: { profilePhoto: response.data.data.profilePhoto } })
      return { success: true }
    } catch (error) {
      dispatch({ type: 'PROFILE_FAILURE', payload: error.response?.data?.message || 'Failed to upload photo' })
      return { success: false, error: error.response?.data?.message || 'Failed to upload photo' }
    }
  }

  const value = {
    profile: state.profile,
    isLoading: state.isLoading,
    error: state.error,
    loadProfile,
    updateProfile,
    addSkill,
    removeSkill,
    uploadPhoto
  }

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
} 