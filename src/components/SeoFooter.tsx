import React from 'react';
import { Shield, FileText, Heart, Lock, Mail, Phone, Cookie, Copyright, Info, AlertTriangle } from 'lucide-react';
import { VyzoraxLogo } from './VyzoraxLogo';
import { LegalPageType } from './legal/legalContent';

interface SeoFooterProps {
  onOpenAdSenseManager?: () => void;
  onOpenLegalPage?: (page: LegalPageType) => void;
}

export const SeoFooter: React.FC<SeoFooterProps> = ({
  onOpenAdSenseManager,
  onOpenLegalPage,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header & Tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-slate-800/80 gap-4">
          <VyzoraxLogo size="md" isDarkTheme={true} showTagline={true} />
          <p className="text-slate-300 text-xs max-w-md text-center sm:text-right">
            <strong>Instagram reels downloader online for free</strong> — Vyzorax.com is the fast <strong>reel downloader online</strong> &amp; <strong>instagram video downloader</strong>. Download instagram reels, save video from instagram, and perform facebook reels download in 1080p Full HD.
          </p>
        </div>

        {/* Keyword Links Grid for SEO Internal Linking */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-8 border-b border-slate-800/80">
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Tools &amp; Savers</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="/instagram-reel-downloader" className="hover:text-rose-400 font-medium">Reel Downloader</a></li>
              <li><a href="/instagram-story-downloader" className="hover:text-rose-400 font-medium">Story Downloader</a></li>
              <li><a href="/instagram-photo-downloader" className="hover:text-rose-400 font-medium">Photo Downloader</a></li>
              <li><a href="/instagram-carousel-downloader" className="hover:text-rose-400 font-medium">Carousel Downloader</a></li>
              <li><a href="/instagram-dp-downloader" className="hover:text-rose-400 font-medium">DP Downloader</a></li>
              <li><a href="/instagram-audio-downloader" className="hover:text-rose-400 font-medium">Audio Downloader</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Help &amp; Support</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onOpenLegalPage?.('help')} className="hover:text-rose-400 font-medium">Help Center</button></li>
              <li><button onClick={() => onOpenLegalPage?.('faq')} className="hover:text-rose-400 font-medium">FAQ</button></li>
              <li><button onClick={() => onOpenLegalPage?.('status')} className="hover:text-rose-400 text-emerald-400 font-medium flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />System Status</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Company &amp; Media</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="/blog" className="hover:text-rose-400 font-semibold text-rose-300">Blog &amp; Articles</a></li>
              <li><button onClick={() => onOpenLegalPage?.('about')} className="hover:text-rose-400 font-medium">About Vyzorax</button></li>
              <li><button onClick={() => onOpenLegalPage?.('contact')} className="hover:text-rose-400 font-medium">Contact Support</button></li>
              <li><a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 text-amber-400/90 font-medium">RSS Feed (XML)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Legal Policies</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onOpenLegalPage?.('privacy')} className="hover:text-rose-400 font-medium">Privacy Policy</button></li>
              <li><button onClick={() => onOpenLegalPage?.('terms')} className="hover:text-rose-400 font-medium">Terms &amp; Conditions</button></li>
              <li><button onClick={() => onOpenLegalPage?.('cookies')} className="hover:text-rose-400 font-medium">Cookie Policy</button></li>
              <li><button onClick={() => onOpenLegalPage?.('disclaimer')} className="hover:text-rose-400 font-medium">Disclaimer Notice</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Compliance</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onOpenLegalPage?.('dmca')} className="hover:text-rose-400 font-medium">DMCA Copyright Policy</button></li>
              <li>
                <button
                  onClick={onOpenAdSenseManager}
                  className="hover:text-rose-400 text-rose-400/90 font-semibold flex items-center gap-1 mt-1"
                >
                  <span>AdSense Audit</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="mt-8 text-center text-slate-500 max-w-3xl mx-auto space-y-2 leading-relaxed">
          <p>
            <strong className="text-slate-400">Disclaimer:</strong> Vyzorax.com is an independent web utility and is not affiliated, endorsed, or associated with Instagram™ or Meta Platforms, Inc. All trademarks, logos, and copyrights belong to their respective owners.
          </p>
          <p>
            Contact: <a href="mailto:contact@vyzorax.com" className="text-slate-400 underline hover:text-white">contact@vyzorax.com</a> | Phone: <a href="tel:+919339316583" className="text-slate-400 underline hover:text-white">+91 9339316583</a>
          </p>
          <p>
            © {new Date().getFullYear()} Vyzorax.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
