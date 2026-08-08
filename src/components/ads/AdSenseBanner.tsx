import React from 'react';
import { AdSenseSlot } from './AdSenseSlot';
import { ADSENSE_SLOTS } from './AdSenseConfig';

interface AdSenseBannerProps {
  slotId?: string;
  className?: string;
  minHeight?: string;
  position?: 'top' | 'mid' | 'footer';
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slotId = ADSENSE_SLOTS.HERO_LEADERBOARD.id,
  className = '',
  minHeight = '90px',
  position = 'top',
}) => {
  return (
    <section
      aria-label="Advertisement Section"
      className={`w-full max-w-5xl mx-auto px-4 ${
        position === 'top' ? 'mt-4 mb-6' : position === 'mid' ? 'my-8' : 'mt-10 mb-6'
      } ${className}`}
    >
      <AdSenseSlot
        slotId={slotId}
        format="horizontal"
        minHeight={minHeight}
        label="Advertisement"
      />
    </section>
  );
};
