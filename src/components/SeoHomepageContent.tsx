import React from 'react';
import {
  Video,
  Film,
  Image,
  Zap,
  ShieldCheck,
  Smartphone,
  Download,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Lock,
  Globe,
  Star,
  Layers,
  Music
} from 'lucide-react';

interface SeoHomepageContentProps {
  onScrollToTop: () => void;
}

export const SeoHomepageContent: React.FC<SeoHomepageContentProps> = ({ onScrollToTop }) => {
  return (
    <div className="bg-slate-950 text-slate-200 py-12 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Overview Intro Article */}
        <article className="prose prose-invert max-w-none space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ultimate Instagram Downloader Suite</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              All-in-One <span className="bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 bg-clip-text text-transparent">Instagram Video Downloader</span> &amp; Media Saver
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Vyzorax provides a free, fast, and secure web solution to <strong>download Instagram videos online</strong>, save trending Reels, capture high-definition photos, and extract audio MP3 tracks without watermarks or login requirements.
            </p>
          </div>

          {/* 3 Main Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Card 1: Video Downloader */}
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 hover:border-rose-500/40 transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Instagram Video Downloader</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Save video from Instagram feed posts, IGTV broadcasts, and video clips directly to your camera roll or desktop in crystal-clear MP4 format up to 1080p Full HD resolution.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>No quality loss or compression</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct MP4 download link</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Reel Downloader */}
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Instagram Reel Downloader</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use our specialized <strong>Instagram Reel Downloader</strong> to extract trending short-form videos with crisp 60fps playback and zero intrusive watermarks.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Watermark-free Reels</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Optional Audio MP3 conversion</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Photo Downloader */}
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Image className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Instagram Photo Downloader</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Download single photos, profile avatars, and multi-image carousel albums in original high-resolution JPG or PNG format with a single click.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Extract full multi-photo carousels</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Preserves original photo resolution</span>
                </li>
              </ul>
            </div>
          </div>
        </article>

        {/* Detailed SEO Narrative Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Core Guides */}
          <div className="space-y-6 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
              <Video className="w-5 h-5 text-rose-400" />
              <span>Fast &amp; Watermark-Free Instagram Video Downloader</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Finding a reliable tool to <strong>download Instagram videos online</strong> can often be frustrating due to invasive pop-ups, slow server speeds, or mandatory sign-ups. Vyzorax simplifies video saving by providing a streamlined, ad-safe online video extractor built directly on high-speed cloud infrastructure.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Whether you are looking to backup your own video content, collect inspiration for creative editing, or save informative video tutorials for offline viewing, our <strong>Instagram video downloader</strong> extracts the exact MP4 video stream directly from official Content Delivery Networks (CDNs), preserving original frame rates and audio clarity.
            </p>
          </div>

          {/* Right Column: Reel Downloader Insights */}
          <div className="space-y-6 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
              <Film className="w-5 h-5 text-indigo-400" />
              <span>Instagram Reel Downloader — Save Reels in 1080p HD</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Instagram Reels have become the world's most engaging short-video format for entertainment, fitness, tech reviews, and comedy. Our specialized <strong>Instagram Reel Downloader</strong> ensures you never lose access to your favorite clips.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unlike traditional screen recording which degrades video resolution and captures unwanted screen overlays, our <strong>Reels downloader</strong> strips away UI elements and delivers a clean, watermark-free high-definition file ready for instant sharing on WhatsApp, Telegram, or personal media archives.
            </p>
          </div>
        </div>

        {/* Features vs Benefits Section */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Features &amp; Key Benefits
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Designed for speed, privacy, and maximum compatibility across all devices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Features List */}
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-rose-400 flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Powerful Technical Features</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-rose-500/20 text-rose-400 rounded mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">1080p Full HD &amp; 60fps Support</strong>
                    Download Instagram videos online in their highest original bitrates without forced downscaling.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-rose-500/20 text-rose-400 rounded mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Carousel Album Extraction</strong>
                    Download all photos and video slides contained in a single Instagram post individually or together.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-rose-500/20 text-rose-400 rounded mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">High-Bitrate MP3 Audio Extraction</strong>
                    Convert reel soundtrack audio into crisp 320 kbps MP3 files for offline listening.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-rose-500/20 text-rose-400 rounded mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Cross-Platform Responsive Web App</strong>
                    Works seamlessly on iOS Safari, Android Chrome, macOS, Windows, Linux, and Smart TVs.
                  </div>
                </li>
              </ul>
            </div>

            {/* Benefits List */}
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>User Experience Benefits</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-amber-500/20 text-amber-400 rounded mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Zero Registration or Login Required</strong>
                    No passwords, personal credentials, or app installations necessary—keep your personal account 100% private.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-amber-500/20 text-amber-400 rounded mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">100% Watermark-Free Downloads</strong>
                    Save pristine media files without overlaid logos, usernames, or extra graphic branding.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-amber-500/20 text-amber-400 rounded mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Unlimited Free Usage</strong>
                    No daily download caps, trial restrictions, or hidden paywalls. Download as many videos as you need.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-amber-500/20 text-amber-400 rounded mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Secure &amp; Encrypted Data Transfer</strong>
                    All connection requests are routed through TLS 1.3 HTTPS encryption for maximum safety.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step by Step Guide Section */}
        <section className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              How to Download Instagram Videos Online in 3 Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Follow this quick step-by-step tutorial to save any Instagram video, Reel, or photo in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 inline-block">Step 1</span>
              <h3 className="font-bold text-white text-sm">Copy the Post Link</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Open Instagram, find the Video, Reel, or Photo post you wish to save, click the 3-dot menu or Share icon, and tap <strong>Copy Link</strong>.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-400 inline-block">Step 2</span>
              <h3 className="font-bold text-white text-sm">Paste URL into Downloader</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Visit <strong>Vyzorax.com</strong> on any browser, paste the copied link into the input field above, and click the <strong>Download</strong> button.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 inline-block">Step 3</span>
              <h3 className="font-bold text-white text-sm">Save to Device</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Preview your media result, choose your desired quality (1080p MP4 or JPG), and save the file directly to your smartphone or laptop.
              </p>
            </div>
          </div>
        </section>

        {/* High Converting Call to Action Banner */}
        <section className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-indigo-950/80 border border-rose-500/30 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Download Instagram Videos &amp; Reels?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Experience lightning-fast media extraction with zero ads blocking your view. Paste your link now and start saving videos in Full HD!
            </p>
          </div>

          <div>
            <button
              onClick={onScrollToTop}
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-rose-500/25 transition-all hover:scale-105"
            >
              <Download className="w-5 h-5" />
              <span>Download Instagram Media Now</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
