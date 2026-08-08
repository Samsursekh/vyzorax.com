import React from 'react';
import { Download, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface CtaSectionProps {
  onScrollToTop: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onScrollToTop }) => {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800/80 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500 via-purple-600 to-transparent blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Fast & Unlimited Downloads</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Download Instagram Videos & Reels?
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            No registration, no watermark, and zero daily limits. Paste your Instagram video or reel link above and save 1080p Full HD media in seconds.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onScrollToTop}
              className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              <Download className="w-5 h-5" />
              <span>Start Downloading Now</span>
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant Edge Processing</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Anonymous</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
