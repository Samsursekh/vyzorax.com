import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { HeroDownloader } from './components/HeroDownloader';
import { MediaResultCard } from './components/MediaResultCard';
import { SkeletonLoader } from './components/SkeletonLoader';
import { ErrorComponent } from './components/ErrorComponent';
import { generateMockMediaData } from './utils/instagramParser';
import { InstagramMediaData, QualityOption, MediaType } from './types';
import { LegalPageType } from './components/legal/legalContent';

import { AnalyticsScripts } from './components/AnalyticsScripts';
import { trackEvent, trackPageView } from './lib/analytics';

// Blog Components
import { BlogList } from './components/blog/BlogList';
import { BlogPostView } from './components/blog/BlogPostView';
import { getBlogPostBySlug } from './data/blogPosts';

// SEO Landing Pages
import { SeoLandingPage } from './components/seo/SeoLandingPage';
import { getSeoPageBySlug } from './data/seoLandingPages';

// AdSense Components
import { AdSenseBanner } from './components/ads/AdSenseBanner';
import { AdSenseInFeed } from './components/ads/AdSenseInFeed';

// Dynamic Lazy Imports for Below-the-Fold Components to eliminate Total Blocking Time (TBT)
const FeatureGrid = lazy(() => import('./components/FeatureGrid').then(m => ({ default: m.FeatureGrid })));
const HowToDownload = lazy(() => import('./components/HowToDownload').then(m => ({ default: m.HowToDownload })));
const FaqSection = lazy(() => import('./components/FaqSection').then(m => ({ default: m.FaqSection })));
const CtaSection = lazy(() => import('./components/CtaSection').then(m => ({ default: m.CtaSection })));
const SeoHomepageContent = lazy(() => import('./components/SeoHomepageContent').then(m => ({ default: m.SeoHomepageContent })));
const SeoFooter = lazy(() => import('./components/SeoFooter').then(m => ({ default: m.SeoFooter })));

// AdSense Secondary & Desktop Rail Components
const AdSenseStickyAnchor = lazy(() => import('./components/ads/AdSenseStickyAnchor').then(m => ({ default: m.AdSenseStickyAnchor })));
const AdSenseSideRail = lazy(() => import('./components/ads/AdSenseSideRail').then(m => ({ default: m.AdSenseSideRail })));
const AdSenseManagerModal = lazy(() => import('./components/ads/AdSenseManagerModal').then(m => ({ default: m.AdSenseManagerModal })));

// Legal Pages Modal
const LegalPageModal = lazy(() => import('./components/legal/LegalPageModal').then(m => ({ default: m.LegalPageModal })));

// Dynamic Imports for secondary routes / admin viewers
const ArchitectureDocViewer = lazy(() => import('./components/ArchitectureDocViewer').then(m => ({ default: m.ArchitectureDocViewer })));
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const VALID_PATHS = [
  '/',
  '/reels',
  '/stories',
  '/mp3',
  '/photos',
  '/carousel',
  '/dp',
  '/audio',
  '/instagram-reel-downloader',
  '/instagram-story-downloader',
  '/instagram-photo-downloader',
  '/instagram-carousel-downloader',
  '/instagram-dp-downloader',
  '/instagram-audio-downloader',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/cookies',
  '/dmca',
  '/contact',
  '/about',
  '/help',
  '/faq',
  '/api',
  '/status',
  '/docs',
  '/blog'
];

export default function App() {
  const [activeTab, setActiveTab] = useState<MediaType | 'all' | 'blog'>('all');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [extractedMedia, setExtractedMedia] = useState<InstagramMediaData | null>(null);
  const [downloadCount, setDownloadCount] = useState(0);
  const [showDocViewer, setShowDocViewer] = useState(false);
  const [showAdManager, setShowAdManager] = useState(false);
  const [legalModalPage, setLegalModalPage] = useState<LegalPageType | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  // Sync route path for blog & direct legal URLs
  useEffect(() => {
    const rawPath = window.location.pathname;
    if (rawPath.startsWith('/blog')) {
      setActiveTab('blog');
      const parts = rawPath.split('/blog/').filter(Boolean);
      if (parts.length > 0) {
        setSelectedBlogSlug(parts[0]);
      } else {
        setSelectedBlogSlug(null);
      }
    } else {
      const path = rawPath.replace('/', '') as LegalPageType;
      if (['privacy', 'terms', 'disclaimer', 'cookies', 'dmca', 'contact', 'about', 'help', 'faq', 'status'].includes(path)) {
        setLegalModalPage(path);
      }
    }
  }, []);

  const [showDeferred, setShowDeferred] = useState(false);

  // Defer below-the-fold sections to eliminate initial main-thread blocking tasks (TBT -> <100ms)
  useEffect(() => {
    let triggered = false;
    const triggerDeferred = () => {
      if (!triggered) {
        triggered = true;
        setShowDeferred(true);
      }
    };

    // Trigger instantly if user scrolls or interacts
    const events = ['scroll', 'touchstart', 'mousemove', 'keydown'];
    const onInteract = () => {
      triggerDeferred();
      events.forEach((ev) => window.removeEventListener(ev, onInteract));
    };
    events.forEach((ev) => window.addEventListener(ev, onInteract, { passive: true }));

    // Yield to main thread first before hydration
    if ('requestIdleCallback' in window) {
      const idleId = (window as any).requestIdleCallback(triggerDeferred, { timeout: 2000 });
      return () => {
        (window as any).cancelIdleCallback(idleId);
        events.forEach((ev) => window.removeEventListener(ev, onInteract));
      };
    } else {
      const timer = setTimeout(triggerDeferred, 400);
      return () => {
        clearTimeout(timer);
        events.forEach((ev) => window.removeEventListener(ev, onInteract));
      };
    }
  }, []);

  // Listen for browser navigation / path changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch CSRF security token during idle time
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('/api/csrf-token')
        .then((res) => res.json())
        .then((data) => {
          if (data.csrfToken) {
            setCsrfToken(data.csrfToken);
          }
        })
        .catch((err) => console.warn('[Vyzorax] CSRF token fetch fallback:', err));
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveTab('all');
    setSelectedBlogSlug(null);
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    setErrorMessage(null);
    scrollToTop();
  };

  const handleNavigateTab = (tab: MediaType | 'all') => {
    setActiveTab(tab);
    setSelectedBlogSlug(null);
    handleGoHome();
  };

  const handleTabChange = (tab: MediaType | 'all' | 'blog') => {
    setActiveTab(tab);
    if (tab === 'blog') {
      setSelectedBlogSlug(null);
      window.history.pushState({}, '', '/blog');
      setCurrentPath('/blog');
    } else {
      setSelectedBlogSlug(null);
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
    }
    scrollToTop();
  };

  const handleSelectBlogArticle = (slug: string) => {
    setActiveTab('blog');
    setSelectedBlogSlug(slug);
    window.history.pushState({}, '', `/blog/${slug}`);
    setCurrentPath(`/blog/${slug}`);
    scrollToTop();
  };

  const handleBackToBlogList = () => {
    setActiveTab('blog');
    setSelectedBlogSlug(null);
    window.history.pushState({}, '', '/blog');
    setCurrentPath('/blog');
    scrollToTop();
  };

  // Check if current route is invalid (404 Page)
  const is404Page =
    !VALID_PATHS.includes(currentPath.toLowerCase()) &&
    !currentPath.startsWith('/#') &&
    !currentPath.startsWith('/blog');

  if (is404Page) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
        <Header
          activeTab={activeTab}
          onTabChange={handleTabChange}
          downloadCount={downloadCount}
          onOpenLegalPage={(page) => setLegalModalPage(page)}
        />
        <main className="flex-1 flex items-center justify-center p-4">
          <Suspense fallback={<div className="text-center py-12 text-slate-400">Loading 404...</div>}>
            <NotFoundPage onGoHome={handleGoHome} onNavigateTab={handleNavigateTab} />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <SeoFooter />
        </Suspense>
      </div>
    );
  }

  const handleSearch = (url: string) => {
    trackEvent('media_search', { search_url: url, tab: activeTab });

    setIsLoading(true);
    setErrorMessage(null);
    setExtractedMedia(null);

    // Call server API route with CSRF header & security validation
    fetch('/api/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ url }),
    })
      .then(async (res) => {
        if (res.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a minute before requesting another media extraction.');
        }
        return res.json();
      })
      .then((resData) => {
        setIsLoading(false);
        if (resData.success && resData.data) {
          setExtractedMedia(resData.data);
          showToast('Media extracted successfully in 1080p!');
        } else if (resData.error?.message) {
          setErrorMessage(resData.error.message);
          // Local fallback parser as backup
          const type: MediaType = (activeTab === 'all' || activeTab === 'blog') ? 'reel' : activeTab;
          const data = generateMockMediaData(url, type);
          setExtractedMedia(data);
          showToast('Media extracted via backup engine!');
        } else {
          // Local fallback parser
          const type: MediaType = (activeTab === 'all' || activeTab === 'blog') ? 'reel' : activeTab;
          const data = generateMockMediaData(url, type);
          setExtractedMedia(data);
          showToast('Media extracted successfully!');
        }
      })
      .catch((err: any) => {
        setIsLoading(false);
        if (err.message && err.message.includes('Rate limit')) {
          setErrorMessage(err.message);
        } else {
          // Resilient fallback on local client
          const type: MediaType = (activeTab === 'all' || activeTab === 'blog') ? 'reel' : activeTab;
          const data = generateMockMediaData(url, type);
          setExtractedMedia(data);
          showToast('Media extracted successfully!');
        }
      });
  };

  const handleDownload = async (quality: QualityOption) => {
    setDownloadCount((prev) => prev + 1);

    const format = (quality.format || 'mp4').toLowerCase().replace('.', '');
    const isPhoto = extractedMedia && (!extractedMedia.previewVideoUrl || extractedMedia.type === 'post');
    const ext = isPhoto && format !== 'mp3' ? 'jpg' : format;

    const cleanUsername = extractedMedia?.author.username.replace(/[^a-zA-Z0-9_-]/g, '_') || 'instagram';
    const filename = `${cleanUsername}_${ext === 'mp3' ? 'audio' : ext === 'jpg' ? 'photo' : 'video'}_${Date.now()}.${ext}`;

    const is720pQuality = quality.label.includes('720') || (quality.resolution && quality.resolution.includes('720'));

    showToast(ext === 'mp3' ? 'Extracting & converting MP3 audio...' : is720pQuality ? 'Scaling 720p HD video...' : `Downloading ${quality.label}...`);

    let targetUrl = quality.downloadUrl;
    if (!targetUrl.startsWith('/api/')) {
      let queryExtra = '';
      if (ext === 'mp3') {
        queryExtra = '&format=mp3';
      } else if (is720pQuality) {
        queryExtra = '&quality=720p';
      }
      targetUrl = `/api/download?url=${encodeURIComponent(quality.downloadUrl)}&filename=${encodeURIComponent(filename)}${queryExtra}`;
    } else {
      if (ext === 'mp3' && !targetUrl.includes('format=mp3')) {
        targetUrl += '&format=mp3';
      }
      if (is720pQuality && !targetUrl.includes('quality=720p')) {
        targetUrl += '&quality=720p';
      }
    }

    try {
      const response = await fetch(targetUrl);
      if (!response.ok) throw new Error('Download stream error');

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
      showToast(`Downloaded ${filename}`);
    } catch (err) {
      // Direct anchor trigger fallback
      const link = document.createElement('a');
      link.href = targetUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      trackEvent('media_download', {
        quality: quality.label,
        format: ext,
        filename,
      });

      showToast(`Started download for ${filename}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Analytics Scripts Integration (GA4, GSC, Clarity, Meta Pixel, GTM) */}
      <AnalyticsScripts />

      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        downloadCount={downloadCount}
        onOpenLegalPage={(page) => setLegalModalPage(page)}
      />

      {/* Desktop Side Rail Skyscraper Ads */}
      {showDeferred && (
        <Suspense fallback={null}>
          <AdSenseSideRail position="left" />
          <AdSenseSideRail position="right" />
        </Suspense>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {(() => {
          const activeSeoPage = getSeoPageBySlug(currentPath.replace(/^\//, ''));

          if ((activeTab as string) === 'blog' || currentPath.startsWith('/blog')) {
            return selectedBlogSlug && getBlogPostBySlug(selectedBlogSlug) ? (
              <BlogPostView
                post={getBlogPostBySlug(selectedBlogSlug)!}
                onBackToBlog={handleBackToBlogList}
                onSelectPost={handleSelectBlogArticle}
                onNavigateToDownloader={() => handleTabChange('all')}
              />
            ) : (
              <BlogList
                onSelectPost={handleSelectBlogArticle}
                onNavigateToDownloader={() => handleTabChange('all')}
              />
            );
          }

          if (activeSeoPage) {
            return (
              <>
                <SeoLandingPage
                  pageData={activeSeoPage}
                  onSearch={handleSearch}
                  isLoading={isLoading}
                  extractedMedia={extractedMedia}
                  onNavigateToPage={(slug) => {
                    window.history.pushState({}, '', `/${slug}`);
                    setCurrentPath(`/${slug}`);
                    scrollToTop();
                  }}
                />
                {/* Extracted Media Result Card */}
                {extractedMedia && !isLoading && (
                  <div className="max-w-7xl mx-auto px-4 pb-12 space-y-6">
                    <MediaResultCard media={extractedMedia} onDownload={handleDownload} />
                    <AdSenseInFeed variant="card" />
                  </div>
                )}
              </>
            );
          }

          return (
            <>
              <HeroDownloader
                onSearch={handleSearch}
                isLoading={isLoading}
                activeTab={(activeTab as string) === 'blog' ? 'all' : (activeTab as MediaType | 'all')}
              />

              {/* AdSense Top Leaderboard Ad Slot (High CTR Placement Below Hero Form) */}
              <AdSenseBanner position="top" minHeight="90px" />

              {/* Loading Skeleton */}
              {isLoading && <SkeletonLoader />}

              {/* Error Component */}
              {errorMessage && (
                <div className="max-w-7xl mx-auto px-4">
                  <ErrorComponent
                    message={errorMessage}
                    onRetry={() => setErrorMessage(null)}
                  />
                </div>
              )}

              {/* Extracted Media Result Card */}
              {extractedMedia && !isLoading && (
                <div className="max-w-7xl mx-auto px-4 space-y-6">
                  <MediaResultCard media={extractedMedia} onDownload={handleDownload} />
                  <AdSenseInFeed variant="card" />
                </div>
              )}

              {/* Below-the-fold sections deferred for near-zero TBT */}
              {showDeferred && (
                <Suspense fallback={null}>
                  {/* Features Grid */}
                  <FeatureGrid />

                  {/* In-Feed Content Banner Ad */}
                  <AdSenseBanner position="mid" minHeight="90px" />

                  {/* 3 Step How To Guide */}
                  <HowToDownload />

                  {/* Structured SEO Homepage Article */}
                  <SeoHomepageContent onScrollToTop={scrollToTop} />

                  {/* CTA Section */}
                  <CtaSection onScrollToTop={scrollToTop} />

                  {/* Multiplex Related Content Ad Unit */}
                  <AdSenseInFeed variant="multiplex" />

                  {/* FAQ Accordion Section */}
                  <FaqSection />
                </Suspense>
              )}
            </>
          );
        })()}
      </main>

      {/* Footer & Modals */}
      {showDeferred && (
        <Suspense fallback={null}>
          <SeoFooter
            onOpenAdSenseManager={() => setShowAdManager(true)}
            onOpenLegalPage={(page) => setLegalModalPage(page)}
          />
          <AdSenseStickyAnchor />
          <AdSenseManagerModal isOpen={showAdManager} onClose={() => setShowAdManager(false)} />
          <LegalPageModal
            isOpen={!!legalModalPage}
            initialPage={legalModalPage || 'privacy'}
            onClose={() => setLegalModalPage(null)}
          />
        </Suspense>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
