import React from 'react';

export default function GalleryHeader() {
  return (
    <div className="mb-12 md:mb-20">
      <h1 className="max-w-[10ch] font-heading text-6xl font-black uppercase leading-[0.85] tracking-normal text-indigo md:text-7xl lg:text-[6rem]">
        DELTA<br />ARCHIVE
      </h1>
      <p className="font-body text-base md:text-lg text-ink/80 max-w-2xl leading-relaxed">
        A visual archive of DELTA events, workshops, and moments, captured and curated over time.
      </p>
    </div>
  );
}
