import React from 'react';

export default function SectionHeading({ eyebrow, heading, className = '' }) {
  return (
    <div className={`mb-10 font-heading ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-2 text-xs text-teal font-bold tracking-[0.2em] uppercase select-none">
          <span className="w-1.5 h-1.5 bg-signal"></span>
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-2xl md:text-4xl font-extrabold text-indigo uppercase mt-2 tracking-tight">
        {heading}
      </h2>
      <div className="w-12 h-[3px] bg-signal mt-4"></div>
    </div>
  );
}
