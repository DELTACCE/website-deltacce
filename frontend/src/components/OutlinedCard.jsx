import React from 'react';

export default function OutlinedCard({
  children,
  className = '',
  bgClass = 'bg-paper',
  tiltAngle = 0, // Default rotation in degrees (e.g. -3, 2)
  hoverStraighten = true,
}) {
  const rotationClass = tiltAngle !== 0 ? `rotate-[${tiltAngle}deg]` : '';

  return (
    <div
      style={{
        transform: tiltAngle ? `rotate(${tiltAngle}deg)` : undefined,
      }}
      className={`
        border-[3px] border-ink p-6 md:p-8 rounded-3xl bg-paper text-ink select-none
        shadow-[5px_5px_0px_0px_#2a2a28] transition-all duration-300 ease-out
        ${hoverStraighten ? 'hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#2a2a28]' : ''}
        ${bgClass} ${className}
      `}
    >
      {children}
    </div>
  );
}
