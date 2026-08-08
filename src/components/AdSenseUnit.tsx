import React from 'react';
import { AdSenseSlot } from './ads/AdSenseSlot';

interface AdSenseUnitProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'sticky';
  client?: string;
  className?: string;
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  slotId = '1234567890',
  format = 'horizontal',
  client,
  className = '',
}) => {
  return (
    <AdSenseSlot
      slotId={slotId}
      format={format}
      clientId={client}
      className={className}
    />
  );
};

