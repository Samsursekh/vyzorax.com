import React from 'react';
import { Home, Search, Video, Music, Layers, ArrowLeft, ShieldAlert } from 'lucide-react';
import { VyzoraxLogo } from './VyzoraxLogo';
import { MediaType } from '../types';

interface NotFoundPageProps {
  onGoHome: () => void;
  onNavigateTab?: (tab: MediaType | 'all') => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome, onNavigateTab }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center" role="main" aria-label="Page Not Found">
      <div className="max-w-2xl w-full mx-auto bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo & 404 Badge */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-6">
          <button 
            onClick={onGoHome} 
            className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-rose-500 rounded-xl p-1"
            aria-label="Return to Vyzorax Home"
          >
            <VyzoraxLogo size="lg" />
          </button>
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold tracking-wider uppercase">
            <ShieldAlert className="w-4 h-4 text-rose-400" aria-hidden="true" />
            <span>404 - Page Not Found</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          Oops! That Page Lost Its Connection
        </h1>

        <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          The link you followed might be broken, expired, or the URL address was typed incorrectly.
          Don't worry, you can easily jump back to Vyzorax tools below.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition-all flex items-center justify-center space-x-2 focus:ring-2 focus:ring-rose-400 focus:outline-none"
            aria-label="Go back to Vyzorax Downloader Homepage"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            <span>Back to Home</span>
          </button>

          <a
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center space-x-2 focus:ring-2 focus:ring-slate-500 focus:outline-none"
            aria-label="Reload Home Page"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            <span>Go to Instagram Downloader</span>
          </a>
        </div>

        {/* Popular Tools Shortcuts */}
        <div className="border-t border-slate-800/80 pt-8 mt-4 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">
            Quick Access Popular Extractor Tools
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => {
                onGoHome();
                if (onNavigateTab) onNavigateTab('reel');
              }}
              className="p-3 rounded-xl bg-slate-950/60 hover:bg-rose-950/30 border border-slate-800 hover:border-rose-500/40 transition-all flex flex-col items-center space-y-1.5 text-slate-300 hover:text-white group focus:outline-none focus:ring-2 focus:ring-rose-500"
              aria-label="Navigate to Reel Downloader"
            >
              <Video className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="text-xs font-semibold">Reel Saver</span>
            </button>

            <button
              onClick={() => {
                onGoHome();
                if (onNavigateTab) onNavigateTab('story');
              }}
              className="p-3 rounded-xl bg-slate-950/60 hover:bg-amber-950/30 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col items-center space-y-1.5 text-slate-300 hover:text-white group focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Navigate to Story Saver"
            >
              <Search className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="text-xs font-semibold">Story Saver</span>
            </button>

            <button
              onClick={() => {
                onGoHome();
                if (onNavigateTab) onNavigateTab('audio');
              }}
              className="p-3 rounded-xl bg-slate-950/60 hover:bg-blue-950/30 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col items-center space-y-1.5 text-slate-300 hover:text-white group focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Navigate to MP3 Converter"
            >
              <Music className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="text-xs font-semibold">MP3 Converter</span>
            </button>

            <button
              onClick={() => {
                onGoHome();
                if (onNavigateTab) onNavigateTab('post');
              }}
              className="p-3 rounded-xl bg-slate-950/60 hover:bg-purple-950/30 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col items-center space-y-1.5 text-slate-300 hover:text-white group focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Navigate to Carousel Downloader"
            >
              <Layers className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="text-xs font-semibold">Carousel Album</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
