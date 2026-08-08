import React from 'react';
import { Zap, ShieldCheck, Film, Download, CheckCircle, Sparkles, Smartphone, Lock, Infinity as InfinityIcon } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'Reel Downloader Online',
      description: 'The premier reel downloader online tool powered by high-speed proxy nodes for direct 1080p video extraction.',
    },
    {
      icon: <Film className="w-6 h-6 text-rose-400" />,
      title: 'Instagram Video Downloader',
      description: 'Perform an instant instagram video downloader extraction in original resolution without watermarks.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Fast Anonymous & Secure',
      description: 'Enjoy a ultra-fast Instagram saver experience with 100% anonymous browsing, high speeds, and zero mandatory login.',
    },
    {
      icon: <InfinityIcon className="w-6 h-6 text-purple-400" />,
      title: 'Download Video IG & Facebook',
      description: 'Easily download video ig links, save video from instagram, and perform facebook reels download with zero limits.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-blue-400" />,
      title: 'Save Video From Instagram',
      description: 'Effortlessly save video from instagram on iOS Safari, Android Chrome, Windows, and macOS devices.',
    },
    {
      icon: <Lock className="w-6 h-6 text-indigo-400" />,
      title: 'Encrypted & Policy Safe',
      description: 'End-to-end HTTPS encryption ensures safe reels downloader operations and total user data privacy.',
    },
  ];

  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Why Choose <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">Vyzorax Reel Downloader Online</span>?
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Engineered as the ultimate free <strong>instagram reels downloader online for free</strong> solution with unmatched speed and reliability.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">{feat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
