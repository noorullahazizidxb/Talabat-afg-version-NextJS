import { useState, useCallback } from 'react'
import { toast } from '../components/ui/Toast'

interface UseAsyncOptions {
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
  showSuccessToast?: boolean
  showErrorToast?: boolean
  successMessage?: string
  errorPrefix?: string
}

/**
 * Hook for handling async operations with loading and error states
 */
export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const {
    onSuccess,
    onError,
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Operation completed successfully',
    errorPrefix = 'An error occurred'
  } = options

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setIsLoading(true)
        setError(null)
        
        const result = await asyncFunction(...args)
        
        setData(result)
        setIsLoading(false)
        
        if (onSuccess) {
          onSuccess(result)
        }
        
        if (showSuccessToast) {
          toast.success(successMessage)
        }
        
        return result
      } catch (err) {
        setIsLoading(false)
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        
        if (onError) {
          onError(error)
        }
        
        if (showErrorToast) {
          toast.error(`${errorPrefix}: ${error.message}`)
        }
        
        return null
      }
    },
    [asyncFunction, onSuccess, onError, showSuccessToast, showErrorToast, successMessage, errorPrefix]
  )

  return {
    isLoading,
    error,
    data,
    execute,
    reset: useCallback(() => {
      setData(null)
      setError(null)
      setIsLoading(false)
    }, [])
  }
}
