import React from 'react';

export default function BlobDivider({ fillClass = 'fill-paper', bgClass = '', flip = false, className = '' }) {
  // fillClass sets the color of the scoop path
  // bgClass sets the background color of the divider container
  // flip allows inverting the curve vertically
  return (
    <div className={`w-full overflow-hidden leading-[0] select-none pointer-events-none ${bgClass} ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`w-full h-10 md:h-16 lg:h-24 ${flip ? 'rotate-180' : ''} ${fillClass}`}
      >
        <path d="M0,0 C240,95 480,120 720,120 C960,120 1200,95 1440,0 L1440,120 L0,120 Z" />
      </svg>
    </div>
  );
}
