import React, { useState } from 'react';
import { X, Sparkles, Info } from 'lucide-react';
import { ADSENSE_SLOTS, DEFAULT_ADSENSE_CONFIG } from './AdSenseConfig';

interface AdSenseStickyAnchorProps {
  slotId?: string;
  clientId?: string;
  testMode?: boolean;
}

export const AdSenseStickyAnchor: React.FC<AdSenseStickyAnchorProps> = ({
  slotId = ADSENSE_SLOTS.MOBILE_STICKY_ANCHOR.id,
  clientId = DEFAULT_ADSENSE_CONFIG.clientId,
  testMode = DEFAULT_ADSENSE_CONFIG.testMode,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      aria-label="Sticky Footer Advertisement"
      className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-lg shadow-2xl px-2 py-1.5 transition-all duration-300"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Ad Badge Label */}
        <div className="hidden sm:flex items-center space-x-1.5 text-[9.5px] font-bold text-slate-400 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 shrink-0">
          <span>Ad</span>
        </div>

        {/* Ad Content Box */}
        <div className="flex-1 flex justify-center items-center min-h-[50px] max-h-[60px] overflow-hidden">
          {testMode ? (
            <div className="w-full max-w-lg bg-slate-900/90 border border-dashed border-slate-800 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span className="font-medium text-[11px] sm:text-xs">
                  Mobile Anchor Ad (320x50 / Responsive)
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono hidden md:inline">
                AdSense Policy Compliant
              </span>
            </div>
          ) : (
            <ins
              className="adsbygoogle"
              style={{ display: 'inline-block', width: '100%', height: '50px' }}
              data-ad-client={clientId}
              data-ad-slot={slotId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          )}
        </div>

        {/* Explicit Close / Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors shrink-0"
          title="Dismiss sticky ad"
          aria-label="Close ad"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
