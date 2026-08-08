import React, { useState, useEffect } from 'react';
import {
  Video,
  Film,
  Image,
  Layers,
  User,
  Music,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Download,
  Globe,
  Star,
  EyeOff,
  History,
  Search
} from 'lucide-react';
import { SeoLandingPageData, SEO_LANDING_PAGES } from '../../data/seoLandingPages';
import { HeroDownloader } from '../HeroDownloader';
import { AdSenseBanner } from '../ads/AdSenseBanner';
import { AdSenseInFeed } from '../ads/AdSenseInFeed';
import { InstagramMediaData } from '../../types';

interface SeoLandingPageProps {
  pageData: SeoLandingPageData;
  onSearch: (url: string) => void;
  isLoading: boolean;
  extractedMedia: InstagramMediaData | null;
  onNavigateToPage: (slug: string) => void;
}

export const SeoLandingPage: React.FC<SeoLandingPageProps> = ({
  pageData,
  onSearch,
  isLoading,
  extractedMedia,
  onNavigateToPage
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Update Page Title, Meta Description, and Canonical URL dynamically
  useEffect(() => {
    document.title = `${pageData.title} | Vyzorax`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageData.metaDescription);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const domain = window.location.origin;
    canonical.setAttribute('href', `${domain}/${pageData.slug}`);

    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageData]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return <Video className="w-5 h-5" />;
      case 'Film':
        return <Film className="w-5 h-5" />;
      case 'Image':
        return <Image className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'User':
        return <User className="w-5 h-5" />;
      case 'Music':
        return <Music className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'EyeOff':
        return <EyeOff className="w-5 h-5" />;
      case 'History':
        return <History className="w-5 h-5" />;
      case 'Search':
        return <Search className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  // Other tools list for internal links
  const otherPages = Object.values(SEO_LANDING_PAGES).filter((p) => p.id !== pageData.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Schema JSON-LD Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageData.schemaJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': pageData.faqs.map((faq) => ({
              '@type': 'Question',
              'name': faq.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
              }
            }))
          })
        }}
      />

      {/* Hero Downloader Header */}
      <section className="pt-6 pb-4">
        <HeroDownloader
          onSearch={onSearch}
          isLoading={isLoading}
          activeTab={pageData.mediaType === 'igtv' ? 'reel' : pageData.mediaType === 'profile' ? 'all' : pageData.mediaType}
        />
      </section>

      {/* High CTR Leaderboard Ad Unit */}
      <AdSenseBanner position="top" minHeight="90px" />

      {/* Main Page Article & SEO Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Title Header & Badge */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{pageData.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {pageData.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {pageData.subtitle}
          </p>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-2">
            {pageData.heroStats.map((stat, i) => (
              <div key={i} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-sm font-bold text-rose-400">{stat.value}</div>
                <div className="text-[11px] text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Overview Article */}
        <article className="bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
            <Zap className="w-5 h-5 text-rose-400" />
            <span>{pageData.overviewHeading}</span>
          </h2>
          <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
            {pageData.overviewParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </article>

        {/* Key Features Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-white">Why Use Our {pageData.primaryKeyword}?</h2>
            <p className="text-xs text-slate-400 mt-1">Engineered for maximum speed, quality, and complete privacy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageData.keyFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-rose-500/30 transition-all flex items-start space-x-4"
              >
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 shrink-0">
                  {renderIcon(feature.icon)}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-sm sm:text-base">{feature.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* In-Feed Banner Ad */}
        <AdSenseInFeed variant="card" />

        {/* Step-by-Step Guide */}
        <section className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              How to Use {pageData.primaryKeyword}
            </h2>
            <p className="text-xs text-slate-400 mt-1">Follow these 3 simple steps to save your media instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageData.stepByStepGuide.map((step) => (
              <div key={step.step} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 inline-block">
                  Step {step.step}
                </span>
                <h3 className="font-bold text-white text-sm">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400 mt-1">Everything you need to know about using {pageData.primaryKeyword}.</p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {pageData.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-semibold text-white text-sm sm:text-base hover:text-rose-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                        isOpen ? 'rotate-180 text-rose-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 pt-3 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Internal Links Hub Section */}
        <section className="bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-xl font-bold text-white">Explore Other Instagram Tools</h2>
            <p className="text-xs text-slate-400 mt-1">Free dedicated downloaders for every type of Instagram content.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {otherPages.map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigateToPage(p.slug)}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-900 transition-all text-left flex flex-col space-y-1.5 group"
              >
                <div className="text-rose-400 group-hover:scale-110 transition-transform">
                  {p.id === 'reels' && <Film className="w-4 h-4" />}
                  {p.id === 'stories' && <History className="w-4 h-4" />}
                  {p.id === 'photos' && <Image className="w-4 h-4" />}
                  {p.id === 'carousel' && <Layers className="w-4 h-4" />}
                  {p.id === 'dp' && <User className="w-4 h-4" />}
                  {p.id === 'audio' && <Music className="w-4 h-4" />}
                </div>
                <div className="font-bold text-xs text-slate-200 group-hover:text-white line-clamp-1">{p.h1}</div>
                <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                  <span>Try Tool</span>
                  <ArrowRight className="w-2.5 h-2.5 text-rose-400" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 border border-rose-500/30 text-center space-y-4">
          <h2 className="text-2xl font-extrabold text-white">
            Ready to Save {pageData.h1}?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Scroll up to paste your link and extract high-definition media in seconds with zero watermarks.
          </p>
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-rose-500/25 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Back to Top Downloader</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
