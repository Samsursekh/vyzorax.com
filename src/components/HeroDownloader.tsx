import React, { useState } from 'react';
import { Clipboard, Download, X, Sparkles, ShieldCheck, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { validateInstagramUrl } from '../utils/instagramParser';
import { MediaType } from '../types';

interface HeroDownloaderProps {
  onSearch: (url: string) => void;
  isLoading: boolean;
  activeTab: MediaType | 'all';
}

export const HeroDownloader: React.FC<HeroDownloaderProps> = ({
  onSearch,
  isLoading,
  activeTab,
}) => {
  const [url, setUrl] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState<string | null>(null);

  const sanitizeInput = (val: string): string => {
    return val
      .replace(/[\x00-\x1F\x7F]/g, '') // Strip control chars
      .replace(/<[^>]*>/g, '') // Strip HTML tags
      .replace(/javascript:/gi, '') // Strip JS protocol
      .trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot anti-bot validation
    if (honeypot) {
      setError('Bot traffic detected.');
      return;
    }

    const cleanUrl = sanitizeInput(url);
    if (!cleanUrl) {
      setError('Please enter or paste an Instagram link');
      return;
    }

    const validation = validateInstagramUrl(cleanUrl);
    if (!validation.isValid) {
      setError(validation.errorMessage || 'Invalid Instagram URL structure');
      return;
    }

    setError(null);
    onSearch(cleanUrl);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setError(null);
      }
    } catch (err) {
      setError('Clipboard access denied. Please paste manually.');
    }
  };

  const handleClear = () => {
    setUrl('');
    setError(null);
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrl(sampleUrl);
    setError(null);
    onSearch(sampleUrl);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-slate-950 border-b border-slate-800/80">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-500 via-purple-600 to-transparent blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Main Headline */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>#1 Reel Downloader Online</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 bg-clip-text text-transparent">Instagram Reels Downloader</span> Online For Free
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          The fast, watermark-free <strong>reel downloader online</strong> and <strong>instagram video downloader</strong>. Perform seamless <strong>instagram reels download</strong>, convert videos to MP3, or <strong>save video from instagram</strong> in 1080p Full HD for all your <strong>reels downloader</strong> needs.
        </p>

        {/* Downloader Form */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            {/* Honeypot Trap Field for Automated Bot Prevention */}
            <input
              type="text"
              name="website_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="absolute -z-50 opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
              aria-hidden="true"
            />

            <div className="relative flex items-center bg-slate-900 rounded-2xl border-2 border-slate-800 focus-within:border-rose-500 shadow-2xl transition-all p-2">
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Paste Instagram link here (e.g., https://www.instagram.com/reel/...)"
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base px-3 sm:px-4 py-2.5 focus:outline-none"
              />

              {/* Action Buttons inside Input */}
              <div className="flex items-center space-x-1.5 shrink-0">
                {url && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    title="Clear text"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handlePaste}
                  className="hidden xs:flex items-center space-x-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition-colors border border-slate-700"
                >
                  <Clipboard className="w-3.5 h-3.5 text-rose-400" />
                  <span>Paste</span>
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-1.5 px-5 py-2.5 bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition-all disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Extracting...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-3 flex items-center justify-center space-x-1.5 text-rose-400 text-xs sm:text-sm font-medium bg-rose-500/10 border border-rose-500/20 py-2 px-4 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </form>

          {/* Quick Demo links */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-500">Test Samples:</span>
            <button
              onClick={() => handleSampleClick('https://www.instagram.com/reel/CX9aB02_xYz/')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/40 hover:text-slate-200 transition-colors"
            >
              🎬 Sample Reel (1080p)
            </button>
            <button
              onClick={() => handleSampleClick('https://www.instagram.com/p/CY8bA01_aBc/')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/40 hover:text-slate-200 transition-colors"
            >
              📸 Sample Photo Carousel
            </button>
            <button
              onClick={() => handleSampleClick('https://www.instagram.com/stories/travel_diaries/3100021/')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/40 hover:text-slate-200 transition-colors"
            >
              ⚡ Sample Story
            </button>
          </div>
        </div>

        {/* Value Proposition Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center space-x-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No Watermark</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>100% Safe & Private</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>High Speed 1080p Full HD</span>
          </div>
        </div>
      </div>
    </section>
  );
};
