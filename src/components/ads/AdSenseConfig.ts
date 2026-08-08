// Google AdSense Configuration & Policy Guidelines Metadata

export interface AdSenseSettings {
  clientId: string;
  autoAdsEnabled: boolean;
  testMode: boolean; // True shows high-fidelity AdSense preview slots in sandbox/dev
  lazyLoadOffsetPx: number; // IntersectionObserver offset
  policyCompliant: boolean;
}

export const DEFAULT_ADSENSE_CONFIG: AdSenseSettings = {
  clientId: 'ca-pub-9876543210123456', // Replace with active Google AdSense Publisher ID
  autoAdsEnabled: true,
  testMode: true, // Display styled policy-compliant AdSense slots in preview mode
  lazyLoadOffsetPx: 250,
  policyCompliant: true,
};

// Recommended AdSense Slot IDs for Vyzorax.com
export const ADSENSE_SLOTS = {
  HERO_LEADERBOARD: {
    id: '1029384756',
    name: 'Top Hero Below-Search Leaderboard (728x90 / Responsive)',
    format: 'horizontal' as const,
    minHeight: '90px',
  },
  IN_FEED_RESULT: {
    id: '2039485761',
    name: 'In-Feed Result Card Banner (300x250 / Responsive)',
    format: 'rectangle' as const,
    minHeight: '250px',
  },
  MID_CONTENT_BANNER: {
    id: '3049586712',
    name: 'Mid-Page Content Banner (728x90)',
    format: 'horizontal' as const,
    minHeight: '90px',
  },
  PRE_FOOTER_MULTIPLEX: {
    id: '4059687123',
    name: 'Pre-Footer Multiplex / Related Content Ad Grid',
    format: 'autorelaxed' as const,
    minHeight: '280px',
  },
  MOBILE_STICKY_ANCHOR: {
    id: '5069788234',
    name: 'Mobile Bottom Sticky Anchor Ad (320x50)',
    format: 'sticky' as const,
    minHeight: '60px',
  },
  SIDE_RAIL_LEFT: {
    id: '6079889345',
    name: 'Desktop Left Side Rail Skyscraper (160x600)',
    format: 'vertical' as const,
    minHeight: '600px',
  },
  SIDE_RAIL_RIGHT: {
    id: '7089980456',
    name: 'Desktop Right Side Rail Skyscraper (160x600)',
    format: 'vertical' as const,
    minHeight: '600px',
  },
};

// Google AdSense Policy Compliance Checklist
export const ADSENSE_POLICY_CHECKLIST = [
  {
    title: 'Content to Ad Ratio',
    description: 'Rich unique SEO content (1000+ words, FAQs, guide) ensures ads do not exceed content volume.',
    status: 'PASS',
  },
  {
    title: 'Zero Cumulative Layout Shift (CLS)',
    description: 'Ad containers pre-allocate exact min-height and aspect ratios before ad scripts load.',
    status: 'PASS',
  },
  {
    title: 'Clear "Advertisement" Labeling',
    description: 'Every ad slot features standard, non-deceptive "Advertisement" tags as required by AdSense rules.',
    status: 'PASS',
  },
  {
    title: 'Accidental Click Prevention',
    description: 'Minimum 20px buffer separating action buttons (Download, Paste) from ad boundaries.',
    status: 'PASS',
  },
  {
    title: 'Lazy Loading & Script Optimization',
    description: 'AdSense script loaded via IntersectionObserver & async deferral to protect Core Web Vitals.',
    status: 'PASS',
  },
  {
    title: 'Mobile Usability & Anchor Policy',
    description: 'Mobile anchor ads include explicit close handlers and responsive constraints.',
    status: 'PASS',
  },
];
