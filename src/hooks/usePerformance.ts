import { useState, useEffect, useCallback } from 'react'
import { performanceTracker } from '../utils/performance'

export function usePerformance(componentName?: string) {
  const [metrics, setMetrics] = useState(performanceTracker.getMetrics())
  const [errorLogs, setErrorLogs] = useState(performanceTracker.getErrorLogs())

  useEffect(() => {
    // Optional: Log component mount performance
    if (componentName) {
      const startTime = performance.now()
      return () => {
        const endTime = performance.now()
        performanceTracker.addMetric({
          name: `${componentName}-mount-time`,
          value: endTime - startTime,
          timestamp: Date.now()
        })
      }
    }
  }, [componentName])

  const logError = useCallback((error: Parameters<typeof performanceTracker.logError>[0]) => {
    performanceTracker.logError({
      ...error,
      context: {
        ...error.context,
        component: componentName
      }
    })
    setErrorLogs(performanceTracker.getErrorLogs())
  }, [componentName])

  const measurePerformance = useCallback(<T>(
    name: string, 
    fn: () => T, 
    context?: Record<string, any>
  ): T => {
    const result = performanceTracker.measurePerformance(
      `${componentName || 'unknown'}-${name}`, 
      fn, 
      context
    )
    setMetrics(performanceTracker.getMetrics())
    return result
  }, [componentName])

  return {
    metrics,
    errorLogs,
    logError,
    measurePerformance
  }
}
