type PerformanceMetric = {
  name: string
  value: number
  timestamp: number
}

type ErrorLog = {
  message: string
  stack?: string
  timestamp: number
  type: 'error' | 'warning' | 'info'
  context?: Record<string, any>
}

class PerformanceTracker {
  private static instance: PerformanceTracker
  private metrics: PerformanceMetric[] = []
  private errorLogs: ErrorLog[] = []

  private constructor() {
    this.initializePerformanceObservers()
    this.setupErrorHandling()
  }

  public static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker()
    }
    return PerformanceTracker.instance
  }

  private initializePerformanceObservers() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Long Task Observer
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.addMetric({
            name: 'long-task',
            value: entry.duration,
            timestamp: entry.startTime
          })
        }
      })
      longTaskObserver.observe({ type: 'longtask', buffered: true })

      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entry = list.getEntries()[0]
        this.addMetric({
          name: 'first-contentful-paint',
          value: entry.startTime,
          timestamp: Date.now()
        })
      })
      fcpObserver.observe({ type: 'paint', buffered: true })
    }
  }

  private setupErrorHandling() {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        this.logError({
          message: event.message,
          stack: event.error?.stack,
          type: 'error',
          timestamp: Date.now(),
          context: {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
          }
        })
      })

      window.addEventListener('unhandledrejection', (event) => {
        this.logError({
          message: event.reason?.message || 'Unhandled Promise Rejection',
          stack: event.reason?.stack,
          type: 'error',
          timestamp: Date.now()
        })
      })
    }
  }

  public addMetric(metric: PerformanceMetric) {
    this.metrics.push(metric)
    this.trimMetrics()
  }

  public logError(error: ErrorLog) {
    this.errorLogs.push({
      ...error,
      timestamp: Date.now()
    })
    this.trimErrorLogs()

    // Optional: Send to external error tracking service
    this.sendErrorToService(error)
  }

  private trimMetrics(maxLength = 100) {
    if (this.metrics.length > maxLength) {
      this.metrics = this.metrics.slice(-maxLength)
    }
  }

  private trimErrorLogs(maxLength = 50) {
    if (this.errorLogs.length > maxLength) {
      this.errorLogs = this.errorLogs.slice(-maxLength)
    }
  }

  private sendErrorToService(error: ErrorLog) {
    // Placeholder for external error reporting service
    // In a real-world scenario, this would send to services like Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      console.error('Error logged:', error)
      // Implement actual error reporting logic here
    }
  }

  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  public getErrorLogs(): ErrorLog[] {
    return [...this.errorLogs]
  }

  public measurePerformance<T>(
    name: string, 
    fn: () => T, 
    context?: Record<string, any>
  ): T {
    const start = performance.now()
    try {
      const result = fn()
      
      // Handle promise/async function
      if (result instanceof Promise) {
        return result.then((asyncResult) => {
          const end = performance.now()
          this.addMetric({
            name,
            value: end - start,
            timestamp: Date.now()
          })
          return asyncResult
        }) as T
      }
      
      // Handle synchronous function
      const end = performance.now()
      this.addMetric({
        name,
        value: end - start,
        timestamp: Date.now()
      })
      
      return result
    } catch (error) {
      this.logError({
        message: `Performance measurement error in ${name}`,
        stack: (error as Error).stack,
        type: 'error',
        timestamp: Date.now(),
        context
      })
      throw error
    }
  }
}

// Singleton instance for easy global access
export const performanceTracker = PerformanceTracker.getInstance()

// Utility hook for React components
export function usePerformanceTracker() {
  return performanceTracker
}
