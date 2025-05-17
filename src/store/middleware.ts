import { StateCreator, StoreMutatorIdentifier, StoreApi } from 'zustand'
import { toast } from '../components/ui/Toast'
import { performanceTracker } from '../utils/performance'

// Define types for async actions middleware
export type AsyncActionState = {
  isLoading: Record<string, boolean>
  errors: Record<string, string | null>
}

type AsyncAction<T extends any[], R> = (...args: T) => Promise<R>

export type AsyncActionsApi = {
  withAsync: <T extends any[], R>(
    actionName: string,
    action: AsyncAction<T, R>,
    options?: {
      onSuccess?: (result: R) => void
      onError?: (error: Error) => void
      showSuccessToast?: boolean
      showErrorToast?: boolean
      successMessage?: string
      errorPrefix?: string
      trackPerformance?: boolean
    }
  ) => AsyncAction<T, R>
}

// Extend the StoreApi type to include withAsync
declare module 'zustand' {
  interface StoreApi<T> {
    withAsync?: AsyncActionsApi['withAsync']
  }
}

// Create middleware for handling async actions
export const withAsyncActions = <T extends AsyncActionState>(
  config?: { name?: string }
) => {
  // This is a middleware creator that returns a Zustand middleware function
  return <U extends T>(
    setState: (fn: (state: U) => U | Partial<U>) => void,
    getState: () => U,
    api: StoreApi<U>
  ) => {
    // Initialize async state if needed
    const state = getState();
    if (!state || !('isLoading' in state) || !('errors' in state)) {
      setState((state) => ({
        ...state,
        isLoading: {},
        errors: {},
      } as U))
    }
    
    // Add withAsync method to the API
    api.withAsync = <TArgs extends any[], R>(
      actionName: string,
      action: (...args: TArgs) => Promise<R>,
      options: {
        onSuccess?: (result: R) => void
        onError?: (error: Error) => void
        showSuccessToast?: boolean
        showErrorToast?: boolean
        successMessage?: string
        errorPrefix?: string
        trackPerformance?: boolean
      } = {}
    ) => {
      return async (...args: TArgs) => {
        // Start loading
        setState((state) => ({
          ...state,
          isLoading: {
            ...(state as any).isLoading,
            [actionName]: true
          }
        } as U))
        
        try {
          const result = await action(...args)
          
          // Clear loading and error
          setState((state) => ({
            ...state,
            isLoading: {
              ...(state as any).isLoading,
              [actionName]: false
            },
            errors: {
              ...(state as any).errors,
              [actionName]: null
            }
          } as U))
          
          if (options.onSuccess) {
            options.onSuccess(result)
          }
          
          if (options.showSuccessToast && options.successMessage) {
            toast.success(options.successMessage)
          }
          
          return result
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An error occurred'
          
          // Set error and clear loading
          setState((state) => ({
            ...state,
            isLoading: {
              ...(state as any).isLoading,
              [actionName]: false
            },
            errors: {
              ...(state as any).errors,
              [actionName]: options.errorPrefix ? `${options.errorPrefix}: ${errorMessage}` : errorMessage
            }
          } as U))
          
          if (options.onError) {
            options.onError(error as Error)
          }
          
          if (options.showErrorToast) {
            toast.error(errorMessage)
          }
          
          throw error
        }
      }
    }
    
    // Return the store API with the withAsync method attached
    return api
  }
}

// Helper function to add async actions to an existing store
export const addAsyncActionsToStore = <T extends AsyncActionState>(store: StoreApi<T>) => {
  const { setState, getState } = store;
  
  // Initialize the middleware
  withAsyncActions<T>()(setState, getState, store);
  
  // Return the store with withAsync method attached
  return store;
}

// Middleware for logging state changes
export const withLogger = <T>(config?: { 
  enabled?: boolean
  name?: string
  filter?: (state: T, prevState: T) => boolean
}) => {
  const { enabled = true, name = 'store', filter } = config || {}
  
  return <S extends T>(
    setState: (partial: S | Partial<S> | ((state: S) => S | Partial<S>), replace?: boolean) => void,
    getState: () => S,
    api: StoreApi<S>
  ) => {
    if (!enabled) {
      return setState
    }
    
    return (partial: S | Partial<S> | ((state: S) => S | Partial<S>), replace?: boolean) => {
      const prevState = getState()
      
      setState(partial, replace)
      
      const nextState = getState()
      
      // Skip logging if filter returns false
      if (filter && !filter(nextState as T, prevState as T)) {
        return
      }
      
      // Log state changes
      const partialState = typeof partial === 'function' 
        ? (partial as (state: S) => S | Partial<S>)(prevState) 
        : partial
      
      console.group(`%c${name} state updated`, 'color: #3498db; font-weight: bold')
      console.log('%cPrevious state:', 'color: #7f8c8d', prevState)
      console.log('%cAction:', 'color: #2ecc71', partialState)
      console.log('%cCurrent state:', 'color: #e67e22', nextState)
      console.groupEnd()
    }
  }
}

// Middleware for tracking store performance
export const withPerformanceTracking = <T>(config?: {
  enabled?: boolean
  name?: string
  threshold?: number
}) => {
  const { enabled = true, name = 'store', threshold = 16 } = config || {}
  
  return <S extends T>(
    setState: (partial: S | Partial<S> | ((state: S) => S | Partial<S>), replace?: boolean) => void,
    getState: () => S,
    api: StoreApi<S>
  ) => {
    if (!enabled) {
      return setState
    }
    
    return (partial: S | Partial<S> | ((state: S) => S | Partial<S>), replace?: boolean) => {
      const startTime = performance.now()
      
      setState(partial, replace)
      
      const duration = performance.now() - startTime
      
      // Track performance if it exceeds threshold
      if (duration > threshold) {
        performanceTracker.addMetric({
          name: `store-update-${name}`,
          value: duration,
          timestamp: Date.now()
        })
      }
    }
  }
}
