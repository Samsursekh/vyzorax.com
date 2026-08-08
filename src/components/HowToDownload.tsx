import React from 'react';
import { Copy, Link2, Download, ArrowRight } from 'lucide-react';

export const HowToDownload: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <Copy className="w-5 h-5 text-rose-400" />,
      title: 'Copy Instagram Link',
      desc: 'Open the Instagram app or website, locate your favorite Reel, Photo, or Story, tap Share and select "Copy Link".',
    },
    {
      num: '02',
      icon: <Link2 className="w-5 h-5 text-indigo-400" />,
      title: 'Paste URL in Downloader',
      desc: 'Paste the copied URL into the search box at the top of Vyzorax.com, or click the instant "Paste" button.',
    },
    {
      num: '03',
      icon: <Download className="w-5 h-5 text-emerald-400" />,
      title: 'Choose Quality & Save',
      desc: 'Select your preferred video resolution (1080p, 720p or MP3 Audio) and click "Download" to save directly to your device.',
    },
  ];

  return (
    <section className="py-12 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
            3 Simple Steps
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            How to Use This Reel Downloader Online
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Follow these easy steps to <strong>download instagram reels</strong> and <strong>save video from instagram</strong> in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, idx) => (
            <div key={idx} className="relative p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {s.icon}
                </div>
                <span className="text-2xl font-extrabold text-slate-700">{s.num}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
