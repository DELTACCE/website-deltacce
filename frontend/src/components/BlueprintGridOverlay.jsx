import React from 'react';

export default function BlueprintGridOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
      {/* Blueprint grid lines */}
      <div className="absolute left-[3%] top-0 bottom-0 w-[1px] bg-indigo/12 hidden md:block" />
      <div className="absolute right-[3%] top-0 bottom-0 w-[1px] bg-indigo/12 hidden md:block" />
      <div className="absolute left-0 right-0 top-[8%] h-[1px] bg-indigo/12" />
      <div className="absolute left-0 right-0 top-[50%] h-[1px] bg-indigo/5" />

      {/* Blueprint text & crosshair tick markers */}
      <div className="absolute left-[3%] top-[8%] text-indigo/35 text-[10px] font-heading font-semibold tracking-widest translate-x-2 translate-y-1.5 hidden lg:block">
        LAT_00.26_N
      </div>
      <div className="absolute right-[3%] top-[8%] text-indigo/35 text-[10px] font-heading font-semibold tracking-widest -translate-x-full -translate-y-4 hidden lg:block">
        + CORNER_GRID_REF
      </div>
    </div>
  );
}
