/**
 * Production-ready Analytics Helper Utility for Vyzorax.com
 * Supports Google Analytics 4 (GA4), Google Tag Manager (GTM), and Microsoft Clarity.
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}

const metaEnv = (import.meta as any).env || {};

export const ANALYTICS_CONFIG = {
  gaId: metaEnv.VITE_GA_MEASUREMENT_ID || '',
  clarityId: metaEnv.VITE_CLARITY_PROJECT_ID || '',
  gtmId: metaEnv.VITE_GTM_CONTAINER_ID || '',
};

/**
 * Track page view across active analytics providers (GA4, GTM)
 */
export function trackPageView(url: string = window.location.pathname) {
  try {
    // GA4 Page View
    if (window.gtag && ANALYTICS_CONFIG.gaId) {
      window.gtag('config', ANALYTICS_CONFIG.gaId, {
        page_path: url,
      });
    }

    // GTM Custom Pageview Event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_location: window.location.href,
        page_path: url,
      });
    }
  } catch (e) {
    console.warn('[Analytics] PageView tracking error:', e);
  }
}

/**
 * Track custom user actions or download events (e.g. media_search, media_download)
 */
export function trackEvent(
  eventName: string,
  parameters: Record<string, any> = {}
) {
  try {
    // GA4 Event
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }

    // GTM Event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...parameters,
      });
    }
  } catch (e) {
    console.warn('[Analytics] Event tracking error:', e);
  }
}

