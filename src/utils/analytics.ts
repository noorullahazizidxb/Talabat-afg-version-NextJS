/**
 * Analytics utility for tracking user interactions and events
 */

export type EventProperties = Record<string, string | number | boolean | null | undefined>

export type EventData = {
  eventName: string
  properties?: EventProperties
  timestamp: number
  userId?: string
  sessionId: string
}

export type PageViewData = {
  path: string
  referrer?: string
  title?: string
  timestamp: number
  userId?: string
  sessionId: string
}

class Analytics {
  private static instance: Analytics
  private events: EventData[] = []
  private pageViews: PageViewData[] = []
  private sessionId: string
  private userId?: string
  private initialized: boolean = false
  private providers: AnalyticsProvider[] = []

  private constructor() {
    this.sessionId = this.generateSessionId()
    this.setupListeners()
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15)
  }

  private setupListeners() {
    if (typeof window !== 'undefined') {
      // Track page views
      this.trackPageView(window.location.pathname)
      
      // Listen for route changes in Next.js
      if (typeof window !== 'undefined') {
        const pushState = history.pushState
        history.pushState = (...args) => {
          pushState.apply(history, args)
          this.trackPageView(window.location.pathname)
        }

        window.addEventListener('popstate', () => {
          this.trackPageView(window.location.pathname)
        })
      }
    }
  }

  public initialize(config: {
    userId?: string
    providers?: AnalyticsProvider[]
  }) {
    this.userId = config.userId
    
    if (config.providers) {
      this.providers = config.providers
      
      // Initialize all providers
      this.providers.forEach(provider => {
        if (provider.initialize) {
          provider.initialize()
        }
      })
    }
    
    this.initialized = true
    
    // Send any queued events
    this.flushEvents()
  }

  public setUserId(userId: string) {
    this.userId = userId
    
    // Update user ID in all providers
    this.providers.forEach(provider => {
      if (provider.setUserId) {
        provider.setUserId(userId)
      }
    })
  }

  public trackEvent(eventName: string, properties?: EventProperties) {
    const eventData: EventData = {
      eventName,
      properties,
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionId
    }
    
    this.events.push(eventData)
    
    // Send to all providers
    if (this.initialized) {
      this.providers.forEach(provider => {
        provider.trackEvent(eventName, properties || {})
      })
    }
    
    return eventData
  }

  public trackPageView(path: string, title?: string) {
    const pageViewData: PageViewData = {
      path,
      title: title || (typeof document !== 'undefined' ? document.title : undefined),
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionId
    }
    
    this.pageViews.push(pageViewData)
    
    // Send to all providers
    if (this.initialized) {
      this.providers.forEach(provider => {
        if (provider.trackPageView) {
          provider.trackPageView(path, {
            title: pageViewData.title,
            referrer: pageViewData.referrer
          })
        }
      })
    }
    
    return pageViewData
  }

  private flushEvents() {
    if (!this.initialized) return
    
    // Send all queued events to providers
    this.events.forEach(event => {
      this.providers.forEach(provider => {
        provider.trackEvent(event.eventName, event.properties || {})
      })
    })
    
    // Send all queued page views to providers
    this.pageViews.forEach(pageView => {
      this.providers.forEach(provider => {
        if (provider.trackPageView) {
          provider.trackPageView(pageView.path, {
            title: pageView.title,
            referrer: pageView.referrer
          })
        }
      })
    })
  }

  public getEvents(): EventData[] {
    return [...this.events]
  }

  public getPageViews(): PageViewData[] {
    return [...this.pageViews]
  }
}

// Analytics provider interface
export interface AnalyticsProvider {
  initialize?: () => void
  setUserId?: (userId: string) => void
  trackEvent: (eventName: string, properties: EventProperties) => void
  trackPageView?: (path: string, properties?: EventProperties) => void
}

// Google Analytics provider
export class GoogleAnalyticsProvider implements AnalyticsProvider {
  initialize() {
    // Initialize Google Analytics (GA4)
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`
      document.head.appendChild(script)
      
      window.dataLayer = window.dataLayer || []
      window.gtag = function() {
        window.dataLayer.push(arguments)
      }
      
      window.gtag('js', new Date())
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
    }
  }
  
  setUserId(userId: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('set', { user_id: userId })
    }
  }
  
  trackEvent(eventName: string, properties: EventProperties) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, properties)
    }
  }
  
  trackPageView(path: string, properties?: EventProperties) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: properties?.title,
        page_location: window.location.origin + path,
        ...properties
      })
    }
  }
}

// Custom event types
export const EventTypes = {
  CLICK: 'click',
  SEARCH: 'search',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  LOGIN: 'login',
  SIGNUP: 'signup',
  SHARE: 'share',
  VIEW_ITEM: 'view_item',
  VIEW_ITEM_LIST: 'view_item_list',
  SELECT_ITEM: 'select_item',
  FILTER: 'filter',
  SORT: 'sort',
}

// Singleton instance for easy global access
export const analytics = Analytics.getInstance()

// Declare global window interface
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
