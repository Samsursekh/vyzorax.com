// Comprehensive SEO-Friendly Legal & Information Content for Vyzorax.com

export type LegalPageType =
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'cookies'
  | 'dmca'
  | 'contact'
  | 'about'
  | 'help'
  | 'faq'
  | 'status';

export interface LegalPageInfo {
  id: LegalPageType;
  title: string;
  metaDescription: string;
  lastUpdated: string;
}

export const LEGAL_PAGES_META: Record<LegalPageType, LegalPageInfo> = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    metaDescription:
      'Vyzorax.com Privacy Policy. Learn how we handle data, protect user privacy, and utilize Google AdSense compliant cookieless ephemeral processing.',
    lastUpdated: 'August 8, 2026',
  },
  terms: {
    id: 'terms',
    title: 'Terms & Conditions',
    metaDescription:
      'Vyzorax.com Terms and Conditions of Service. Rules and guidelines for using our free online Instagram reels downloader and video saving tools.',
    lastUpdated: 'August 8, 2026',
  },
  disclaimer: {
    id: 'disclaimer',
    title: 'Disclaimer & Non-Affiliation',
    metaDescription:
      'Official Disclaimer for Vyzorax.com. Independent web service not affiliated with Instagram, Meta Platforms, Inc., or Facebook.',
    lastUpdated: 'August 8, 2026',
  },
  cookies: {
    id: 'cookies',
    title: 'Cookie Policy',
    metaDescription:
      'Cookie Policy for Vyzorax.com. Information on essential browser cookies, Google AdSense DART cookies, and privacy controls.',
    lastUpdated: 'August 8, 2026',
  },
  dmca: {
    id: 'dmca',
    title: 'DMCA Copyright Policy',
    metaDescription:
      'Digital Millennium Copyright Act (DMCA) compliance notice and copyright takedown procedure for Vyzorax.com.',
    lastUpdated: 'August 8, 2026',
  },
  contact: {
    id: 'contact',
    title: 'Contact Us',
    metaDescription:
      'Get in touch with the Vyzorax.com support team. Email: contact@vyzorax.com | Phone: +91 9339316583.',
    lastUpdated: 'August 8, 2026',
  },
  about: {
    id: 'about',
    title: 'About Vyzorax.com',
    metaDescription:
      'Learn about Vyzorax.com — the world leading free online Instagram reels downloader, video saver, and MP3 extractor.',
    lastUpdated: 'August 8, 2026',
  },
  help: {
    id: 'help',
    title: 'Help Center & Troubleshooting',
    metaDescription:
      'Step-by-step help guides, troubleshooting solutions, and usage instructions for Vyzorax Instagram Downloader.',
    lastUpdated: 'August 8, 2026',
  },
  faq: {
    id: 'faq',
    title: 'Frequently Asked Questions (FAQ)',
    metaDescription:
      'Answers to common questions about downloading Instagram Reels, Stories, Photos, Carousels, and Audio on Vyzorax.com.',
    lastUpdated: 'August 8, 2026',
  },
  status: {
    id: 'status',
    title: 'System Operational Status & Uptime',
    metaDescription:
      'Real-time system health, GraphQL proxy latencies, CDN server status, and uptime history for Vyzorax.com.',
    lastUpdated: 'August 8, 2026',
  },
};

export const CONTACT_DETAILS = {
  phone: '+91 9339316583',
  email: 'contact@vyzorax.com',
  dmcaEmail: 'contact@vyzorax.com',
  address: 'Vyzorax Digital Media Tech, India',
  website: 'https://vyzorax.com',
  responseSLA: 'Within 24 Business Hours',
};
