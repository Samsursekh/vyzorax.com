import React from 'react';
import { AdSenseSlot } from './AdSenseSlot';
import { ADSENSE_SLOTS } from './AdSenseConfig';

interface AdSenseInFeedProps {
  slotId?: string;
  className?: string;
  variant?: 'card' | 'native' | 'multiplex';
}

export const AdSenseInFeed: React.FC<AdSenseInFeedProps> = ({
  slotId = ADSENSE_SLOTS.IN_FEED_RESULT.id,
  className = '',
  variant = 'card',
}) => {
  return (
    <div
      aria-label="Sponsored Feed Advertisement"
      className={`w-full max-w-4xl mx-auto px-4 my-6 ${className}`}
    >
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md shadow-xl">
        <AdSenseSlot
          slotId={slotId}
          format={variant === 'multiplex' ? 'autorelaxed' : 'rectangle'}
          minHeight={variant === 'multiplex' ? '280px' : '250px'}
          label="Sponsored"
        />
      </div>
    </div>
  );
};
