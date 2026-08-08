import React from 'react';
import { AdSenseSlot } from './AdSenseSlot';
import { ADSENSE_SLOTS } from './AdSenseConfig';

interface AdSenseSideRailProps {
  position: 'left' | 'right';
}

export const AdSenseSideRail: React.FC<AdSenseSideRailProps> = ({ position }) => {
  const slotId =
    position === 'left' ? ADSENSE_SLOTS.SIDE_RAIL_LEFT.id : ADSENSE_SLOTS.SIDE_RAIL_RIGHT.id;

  return (
    <aside
      aria-label={`${position} side rail advertisement`}
      className={`hidden 2xl:block fixed top-24 ${
        position === 'left' ? 'left-4' : 'right-4'
      } z-30 w-40 h-[620px] transition-all`}
    >
      <div className="sticky top-24 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-2 backdrop-blur-md shadow-2xl">
        <AdSenseSlot
          slotId={slotId}
          format="vertical"
          minHeight="600px"
          label="Ad"
          showDismissButton={false}
        />
      </div>
    </aside>
  );
};
