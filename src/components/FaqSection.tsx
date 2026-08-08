import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'Is this Instagram reels downloader online for free?',
      a: 'Yes! Vyzorax.com is a 100% free reel downloader online. You can perform unlimited instagram reels download, save videos, photos, and MP3 audio with zero subscription fees or registration requirements.',
    },
    {
      q: 'How do I perform an instagram reels download or save video from instagram?',
      a: 'Copy the URL of any Reel, open our instagram video downloader search box, paste the link, and click Download. Your 1080p HD video will save directly to your device.',
    },
    {
      q: 'Is Vyzorax safe and fast for downloading videos?',
      a: 'Yes! Vyzorax.com provides instant video parsing, high-speed 1080p Full HD video extraction, 320 kbps MP3 conversion, and Facebook reels download capabilities.',
    },
    {
      q: 'Can I download video ig links and Facebook Reels?',
      a: 'Yes! You can download video ig links, save video from instagram, and perform facebook reels download effortlessly across mobile and desktop browsers.',
    },
    {
      q: 'Does this reels downloader output watermark-free 1080p HD?',
      a: 'Absolutely. Our reels downloader engine extracts original MP4 video streams directly from CDN servers without adding any watermarks or lowering quality.',
    },
    {
      q: 'How to download instagram reels on iPhone or Android?',
      a: 'Copy the Reel link, launch Safari or Chrome, visit Vyzorax.com, paste the link into the reel downloader online bar, and tap Download to save to Files or Gallery.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>SEO Schema FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Everything you need to know about downloading Instagram Reels, Photos, and Stories.
          </p>

          {/* FAQ Search */}
          <div className="mt-4 max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full bg-slate-900 text-slate-200 text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-rose-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-sm sm:text-base text-slate-100 hover:text-rose-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-rose-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/50 mt-1">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
