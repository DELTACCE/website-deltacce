import React from 'react';

export default function GalleryNav({ events, activeEventId, onNavigate, getGallerySectionId }) {
  return (
    <>
      {/* Mobile: fixed floating pill on the left, overlaying content */}
      <nav
        className="md:hidden fixed left-3 top-[50%] -translate-y-[50%] z-50 flex flex-col gap-1 rounded-2xl bg-paper/80 backdrop-blur-md px-2.5 py-3 shadow-lg border border-indigo/10"
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
              title={item.name}
              className={`group flex items-center gap-1.5 py-1 text-left font-heading font-bold uppercase tracking-[0.12em] transition-all duration-300 text-[7px] ${
                isActive ? 'text-indigo' : 'text-indigo/35 hover:text-indigo/70'
              }`}
            >
              <span
                className={`block h-[2px] shrink-0 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-3 bg-signal'
                    : 'w-0 bg-transparent group-hover:w-2 group-hover:bg-indigo/30'
                }`}
                aria-hidden
              />
              <span className="leading-tight max-w-[4.5rem] truncate">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Desktop: sticky in normal column flow */}
      <nav
        className="hidden md:flex sticky top-[100px] self-start flex-col gap-0.5 pt-2"
        aria-label="Gallery events"
      >
        <p className="mb-3 font-heading text-[9px] font-bold uppercase tracking-[0.3em] text-teal/80">
          Events
        </p>
        {events.map((item) => {
          const sectionId = getGallerySectionId(item.tag);
          const isActive = sectionId === activeEventId;

          return (
            <button
              key={item.tag}
              type="button"
              onClick={() => onNavigate(sectionId)}
              className={`group flex items-center gap-3 py-1.5 text-left font-heading text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive ? 'text-indigo' : 'text-indigo/35 hover:text-indigo/70'
              }`}
            >
              <span
                className={`block h-[2px] shrink-0 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-6 bg-signal'
                    : 'w-0 bg-transparent group-hover:w-4 group-hover:bg-indigo/30'
                }`}
                aria-hidden
              />
              <span className="leading-tight">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
