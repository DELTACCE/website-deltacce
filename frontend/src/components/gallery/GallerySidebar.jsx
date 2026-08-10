import React from 'react';

export default function GallerySidebar({ events, activeEventId, onNavigate, getGallerySectionId }) {
  return (
    <aside className="md:sticky md:top-0 md:h-full md:min-h-0 md:self-stretch md:overflow-y-auto [&::-webkit-scrollbar]:hidden md:pr-10 md:py-16 md:pb-16 pt-8 pb-12">
      <div className="flex min-h-0 flex-col gap-8 md:h-full md:flex-1 md:justify-between">
        <div className="space-y-6">
          <h1 className="max-w-[8ch] font-heading text-6xl font-black uppercase leading-[0.85] tracking-normal text-indigo md:text-7xl lg:text-[5.5rem]">
            DELTA<br/>ARCHIVE
          </h1>
          <p className="max-w-sm text-sm font-light leading-relaxed text-indigo/70 md:max-w-[16rem]">
            Selected event media, arranged as an editorial archive.
          </p>
        </div>

        <nav
          className="mt-8 flex flex-col gap-2 md:mt-auto md:max-w-sm"
          aria-label="Gallery events"
        >
          {events.map((item) => {
            const sectionId = getGallerySectionId(item.tag);
            const isActive = sectionId === activeEventId;

            return (
              <button
                key={item.tag}
                type="button"
                onClick={() => onNavigate(sectionId)}
                className={`group flex items-center gap-4 py-2 text-left font-heading text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 ${
                  isActive ? 'text-indigo' : 'text-indigo/40 hover:text-indigo/80'
                }`}
              >
                <span 
                  className={`h-[2px] transition-all duration-300 ${
                    isActive ? 'w-6 bg-signal' : 'w-0 bg-transparent group-hover:w-4 group-hover:bg-indigo/30'
                  }`} 
                  aria-hidden 
                />
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
