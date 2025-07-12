import { useState, useEffect } from 'react'
import { swapService } from '../services/swaps'

export const useSwaps = () => {
  const [swaps, setSwaps] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadSwaps = async (params = {}) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await swapService.getSwaps(params)
      setSwaps(response.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load swaps')
    } finally {
      setIsLoading(false)
    }
  }

  const createSwap = async (swapData) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await swapService.createSwap(swapData)
      setSwaps(prev => [response.data.data, ...prev])
      return { success: true, data: response.data.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create swap'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const updateSwap = async (swapId, updateData) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await swapService.updateSwap(swapId, updateData)
      setSwaps(prev => prev.map(swap => 
        swap._id === swapId ? response.data.data : swap
      ))
      return { success: true, data: response.data.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update swap'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const deleteSwap = async (swapId) => {
    try {
      setIsLoading(true)
      setError(null)
      await swapService.deleteSwap(swapId)
      setSwaps(prev => prev.filter(swap => swap._id !== swapId))
      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete swap'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const rateSwap = async (swapId, ratingData) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await swapService.rateSwap(swapId, ratingData)
      setSwaps(prev => prev.map(swap => 
        swap._id === swapId ? response.data.data : swap
      ))
      return { success: true, data: response.data.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to rate swap'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    swaps,
    isLoading,
    error,
    loadSwaps,
    createSwap,
    updateSwap,
    deleteSwap,
    rateSwap
  }
} 