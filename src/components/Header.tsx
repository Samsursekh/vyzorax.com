import React, { useState } from 'react';
import { Video, Image, Zap, Music, History, Menu, X, Layers, Mail, BookOpen } from 'lucide-react';
import { MediaType } from '../types';
import { VyzoraxLogo } from './VyzoraxLogo';
import { LegalPageType } from './legal/legalContent';

interface HeaderProps {
  activeTab: MediaType | 'all' | 'blog';
  onTabChange: (tab: MediaType | 'all' | 'blog') => void;
  downloadCount: number;
  onOpenLegalPage?: (page: LegalPageType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  downloadCount,
  onOpenLegalPage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectTab = (tab: MediaType | 'all' | 'blog') => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex items-center cursor-pointer" onClick={() => handleSelectTab('all')}>
            <VyzoraxLogo size="sm" isDarkTheme={true} showTagline={true} />
          </div>

          {/* Nav menu and actions aligned to the right hand side */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => handleSelectTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'all'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                All Media
              </button>
              <button
                onClick={() => handleSelectTab('reel')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'reel'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Reels</span>
              </button>
              <button
                onClick={() => handleSelectTab('post')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'post'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Image className="w-3.5 h-3.5" />
                <span>Photos</span>
              </button>
              <button
                onClick={() => handleSelectTab('story')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'story'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Stories</span>
              </button>
              <button
                onClick={() => handleSelectTab('audio')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'audio'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>Audio MP3</span>
              </button>
              <button
                onClick={() => handleSelectTab('blog')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'blog'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Blog</span>
              </button>
            </nav>

            {/* Quick Contact Button */}
            <button
              onClick={() => onOpenLegalPage?.('contact')}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-semibold transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span>Contact Us</span>
            </button>

            {/* Download Counter Pill */}
            {downloadCount > 0 && (
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <History className="w-3.5 h-3.5" />
                <span>{downloadCount} downloaded</span>
              </div>
            )}

            {/* Mobile Menu Icon Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-200 hover:text-white hover:bg-slate-700 focus:outline-none transition-all active:scale-95 shadow-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5 text-slate-200" />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 w-full bg-slate-900/98 backdrop-blur-xl border-b border-slate-800 px-4 py-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-md mx-auto space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 pb-1">Select Format</div>
            <button
              onClick={() => handleSelectTab('all')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : 'bg-slate-950/70 text-slate-200 hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${activeTab === 'all' ? 'bg-white/20' : 'bg-slate-800 text-rose-400'}`}>
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold">All Media</div>
                <div className="text-xs opacity-80 font-normal">Reels, Photos, Stories & Audio</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectTab('reel')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'reel'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : 'bg-slate-950/70 text-slate-200 hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${activeTab === 'reel' ? 'bg-white/20' : 'bg-slate-800 text-rose-400'}`}>
                <Video className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold">Instagram Reels</div>
                <div className="text-xs opacity-80 font-normal">Fast 1080p Full HD video download</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectTab('post')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'post'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : 'bg-slate-950/70 text-slate-200 hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${activeTab === 'post' ? 'bg-white/20' : 'bg-slate-800 text-indigo-400'}`}>
                <Image className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold">Photos & Carousel</div>
                <div className="text-xs opacity-80 font-normal">High resolution picture downloader</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectTab('story')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'story'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : 'bg-slate-950/70 text-slate-200 hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${activeTab === 'story' ? 'bg-white/20' : 'bg-slate-800 text-amber-400'}`}>
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold">Stories & Highlights</div>
                <div className="text-xs opacity-80 font-normal">Save stories before 24h expiration</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectTab('audio')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'audio'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : 'bg-slate-950/70 text-slate-200 hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${activeTab === 'audio' ? 'bg-white/20' : 'bg-slate-800 text-emerald-400'}`}>
                <Music className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold">Audio MP3 Downloader</div>
                <div className="text-xs opacity-80 font-normal">Extract high quality 320kbps audio</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectTab('blog')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'blog'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : 'bg-slate-950/70 text-slate-200 hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${activeTab === 'blog' ? 'bg-white/20' : 'bg-slate-800 text-amber-400'}`}>
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold">Blog &amp; Knowledge Center</div>
                <div className="text-xs opacity-80 font-normal">Tutorials, guides &amp; Instagram tech insights</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

