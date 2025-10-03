// Analytics utility - No-op implementation for frontend-only
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

class Analytics {
  track(eventName: string, properties?: Record<string, any>): void {
    // No-op implementation - ready for future integration
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics:', eventName, properties);
    }
  }

  page(pageName: string, properties?: Record<string, any>): void {
    // No-op implementation - ready for future integration
    if (process.env.NODE_ENV === 'development') {
      console.log('Page view:', pageName, properties);
    }
  }

  identify(userId: string, traits?: Record<string, any>): void {
    // No-op implementation - ready for future integration
    if (process.env.NODE_ENV === 'development') {
      console.log('Identify:', userId, traits);
    }
  }
}

export const analytics = new Analytics();