import React, { useEffect, useRef, useState } from 'react';
import { X, ExternalLink, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DEFAULT_ADSENSE_CONFIG } from './AdSenseConfig';

export interface AdSenseSlotProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical' | 'sticky' | 'autorelaxed';
  clientId?: string;
  className?: string;
  minHeight?: string;
  label?: string;
  testMode?: boolean;
  showDismissButton?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, any>>;
  }
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotId = '1234567890',
  format = 'horizontal',
  clientId = DEFAULT_ADSENSE_CONFIG.clientId,
  className = '',
  minHeight = '90px',
  label = 'Advertisement',
  testMode = DEFAULT_ADSENSE_CONFIG.testMode,
  showDismissButton = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const adRef = useRef<HTMLModElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adFailed, setAdFailed] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Lazy Load via IntersectionObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: `${DEFAULT_ADSENSE_CONFIG.lazyLoadOffsetPx}px` }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Initialize AdSense script push when visible
  useEffect(() => {
    if (!isVisible || testMode) return;

    try {
      // Ensure AdSense library script is dynamically injected if not present
      if (!document.getElementById('adsense-script')) {
        const script = document.createElement('script');
        script.id = 'adsense-script';
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }

      // Push AdSense slot payload
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setAdLoaded(true);
    } catch (err) {
      console.warn('[AdSense] Failed to initialize ad slot:', err);
      setAdFailed(true);
    }
  }, [isVisible, testMode, clientId]);

  if (dismissed) return null;

  // Resolve container CSS dimensions to eliminate Cumulative Layout Shift (CLS)
  const getFormatStyle = () => {
    switch (format) {
      case 'horizontal':
        return { minHeight: minHeight || '90px', maxWidth: '100%' };
      case 'rectangle':
        return { minHeight: minHeight || '250px', maxWidth: '336px' };
      case 'vertical':
        return { minHeight: minHeight || '600px', width: '160px' };
      case 'sticky':
        return { minHeight: '60px', width: '100%' };
      case 'autorelaxed':
        return { minHeight: minHeight || '280px', width: '100%' };
      default:
        return { minHeight: minHeight || '90px', width: '100%' };
    }
  };

  const styleProps = getFormatStyle();

  return (
    <div
      ref={containerRef}
      className={`my-4 w-full flex flex-col items-center justify-center transition-all ${className}`}
    >
      {/* Policy Compliant Outer Container with Reserved Min-Height to Avoid CLS */}
      <div
        className="w-full max-w-4xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-2.5 relative overflow-hidden text-center transition-all hover:border-slate-700/80 shadow-lg shadow-black/20"
        style={{ minHeight: styleProps.minHeight }}
      >
        {/* Ad Badge Header (Mandatory AdSense Policy Disclosure) */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-2 px-1 select-none">
          <div className="flex items-center space-x-1.5">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-rose-400 font-bold uppercase tracking-wider border border-slate-700/60">
              {label}
            </span>
            <span className="hidden sm:inline text-slate-500">• Google AdSense Slot</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[9.5px] text-emerald-400/90 font-mono hidden md:inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              CLS Reserved Container ({styleProps.minHeight})
            </span>
            {showDismissButton && (
              <button
                onClick={() => setDismissed(true)}
                className="text-slate-500 hover:text-slate-300 p-1 rounded-md hover:bg-slate-800/60 transition-colors"
                title="Dismiss ad preview"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Real AdSense Slot or Developer Test Preview */}
        {!testMode && isVisible ? (
          <div className="w-full flex justify-center items-center overflow-hidden">
            <ins
              ref={adRef}
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', minHeight: styleProps.minHeight }}
              data-ad-client={clientId}
              data-ad-slot={slotId}
              data-ad-format={format === 'sticky' ? 'auto' : format}
              data-full-width-responsive="true"
            ></ins>
          </div>
        ) : (
          /* High-Fidelity Interactive Preview Slot for Sandbox & Dev Environments */
          <div
            className="w-full bg-slate-950/90 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center p-3 relative overflow-hidden group"
            style={{ minHeight: `calc(${styleProps.minHeight} - 28px)` }}
          >
            {/* Subtle Gradient Accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-amber-500/5 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            {format === 'horizontal' && (
              <div className="flex flex-col items-center space-y-1.5 z-10">
                <div className="flex items-center space-x-2 text-slate-300 text-xs font-semibold">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  <span>Google AdSense Responsive Leaderboard (728x90)</span>
                </div>
                <p className="text-[11px] text-slate-500 max-w-lg leading-relaxed">
                  High-RPM header slot placement optimized for user viewability without layout shift.
                </p>
                <div className="flex items-center space-x-3 text-[10px] text-slate-600 font-mono pt-1">
                  <span>Slot: {slotId}</span>
                  <span>•</span>
                  <span>Client: {clientId.slice(0, 12)}...</span>
                </div>
              </div>
            )}

            {format === 'rectangle' && (
              <div className="flex flex-col items-center space-y-2 z-10">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-400 shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-slate-200 text-xs font-semibold">
                  AdSense In-Feed Rectangle (300x250)
                </div>
                <p className="text-[11px] text-slate-500 text-center max-w-xs">
                  Native content feed ad layout styled seamlessly with dark UI theme.
                </p>
                <span className="text-[10px] text-slate-600 font-mono">Slot ID: {slotId}</span>
              </div>
            )}

            {format === 'vertical' && (
              <div className="flex flex-col items-center justify-center space-y-3 h-full z-10 py-6 text-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="text-xs font-semibold text-slate-300 rotate-0">
                  Side Skyscraper
                </span>
                <span className="text-[10px] text-slate-600 font-mono">160x600</span>
              </div>
            )}

            {format === 'autorelaxed' && (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 z-10 p-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 text-left flex flex-col justify-between"
                  >
                    <div className="w-full h-16 bg-slate-800/60 rounded mb-2 flex items-center justify-center text-[10px] text-slate-500">
                      Sponsored Media
                    </div>
                    <div className="text-[11px] font-medium text-slate-300 line-clamp-1">
                      Promoted Reel Tools #{i}
                    </div>
                    <div className="text-[9.5px] text-slate-500 mt-1">AdSense Multiplex</div>
                  </div>
                ))}
              </div>
            )}

            {format === 'sticky' && (
              <div className="flex items-center justify-between w-full px-3 text-xs text-slate-300 font-medium z-10">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  <span>Mobile Anchor Banner (320x50)</span>
                </div>
                <span className="text-[10px] text-slate-500">Policy Compliant Anchor</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
