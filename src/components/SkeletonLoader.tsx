import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-2xl animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-full bg-slate-800"></div>
          <div className="space-y-2">
            <div className="w-32 h-4 bg-slate-800 rounded"></div>
            <div className="w-24 h-3 bg-slate-800/60 rounded"></div>
          </div>
        </div>
        <div className="w-20 h-6 bg-slate-800 rounded-full"></div>
      </div>

      {/* Body Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
        {/* Thumbnail Skeleton */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="w-full aspect-[4/5] max-w-sm rounded-2xl bg-slate-800/80"></div>
        </div>

        {/* Quality Options Skeleton */}
        <div className="md:col-span-7 space-y-4">
          <div className="w-3/4 h-6 bg-slate-800 rounded"></div>
          <div className="w-full h-12 bg-slate-800/50 rounded"></div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="w-full h-16 bg-slate-800/60 rounded-2xl"></div>
            <div className="w-full h-16 bg-slate-800/60 rounded-2xl"></div>
            <div className="w-full h-16 bg-slate-800/60 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
