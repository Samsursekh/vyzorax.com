import React, { useEffect } from 'react';
import { ANALYTICS_CONFIG } from '../lib/analytics';

/**
 * AnalyticsScripts component dynamically initializes and injects production analytics tags:
 * - Google Analytics 4 (GA4)
 * - Google Tag Manager (GTM) [Optional]
 * - Microsoft Clarity [Optional]
 *
 * Note: Google Search Console (GSC) verification is handled directly via DNS TXT records.
 */
export const AnalyticsScripts: React.FC = () => {
  useEffect(() => {
    const { gaId, clarityId, gtmId } = ANALYTICS_CONFIG;

    // 1. Google Tag Manager (GTM)
    if (gtmId && !document.getElementById('gtm-script')) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });

      const script = document.createElement('script');
      script.id = 'gtm-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      document.head.appendChild(script);
      console.log(`[Analytics] Google Tag Manager initialized (${gtmId}).`);
    }

    // 2. Google Analytics 4 (GA4)
    if (gaId && !document.getElementById('ga4-script')) {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', gaId, {
        send_page_view: true,
      });

      const script = document.createElement('script');
      script.id = 'ga4-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);
      console.log(`[Analytics] Google Analytics 4 initialized (${gaId}).`);
    }

    // 3. Microsoft Clarity
    if (clarityId && !document.getElementById('clarity-script')) {
      (function (c: any, l: any, a: any, r: any, i: any) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        const t = l.createElement(r);
        t.id = 'clarity-script';
        t.async = 1;
        t.src = 'https://www.clarity.ms/tag/' + i;
        const y = l.getElementsByTagName(r)[0];
        if (y && y.parentNode) {
          y.parentNode.insertBefore(t, y);
        } else {
          document.head.appendChild(t);
        }
      })(window, document, 'clarity', 'script', clarityId);
      console.log(`[Analytics] Microsoft Clarity initialized (${clarityId}).`);
    }
  }, []);

  return null;
};

