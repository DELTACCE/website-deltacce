import React from 'react';

export default function GallerySidebar({ events, activeEventId, onNavigate, getGallerySectionId }) {
  return (
    <aside className="md:sticky md:top-0 md:h-full md:min-h-0 md:self-stretch md:overflow-hidden md:pr-6 md:py-0 md:pb-8">
      <div className="rounded-[2rem] bg-indigo/6 p-2 md:h-full md:min-h-0 md:overflow-hidden">
        <div className="relative overflow-hidden rounded-[1.6rem] border border-indigo/20 bg-indigo p-4 text-paper shadow-[0_18px_48px_rgba(14,48,97,0.22)] md:flex md:h-full md:min-h-0 md:flex-col md:overflow-hidden md:p-6 lg:p-8">
        <div className="absolute inset-x-4 top-20 hidden h-px bg-paper/10 md:block" />
        <div className="flex min-h-0 flex-col gap-3 md:flex-1 md:justify-between">
          <div className="space-y-2">
            <div className="font-heading text-[10px] font-bold uppercase tracking-[0.3em] text-teal/90">
              Gallery Archive
            </div>
            <h1 className="max-w-[7ch] font-heading text-4xl font-extrabold uppercase leading-[0.9] tracking-normal text-paper sm:text-5xl lg:text-6xl">
              GALLERY
            </h1>
            <p className="max-w-sm text-sm leading-6 text-paper/65 md:max-w-[18rem]">
              Selected event media from DELTA, arranged as an editorial archive.
            </p>
          </div>

          <nav
            className="mt-2 flex flex-wrap gap-2 md:mt-auto md:max-w-sm md:pb-1"
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
                  className="inline-flex min-w-0 flex-1 items-center justify-between rounded-2xl border px-3 py-2 text-left font-heading text-[11px] font-bold uppercase tracking-[0.22em] transition-colors duration-200 motion-reduce:transition-none sm:min-w-[10rem] md:min-w-full md:px-4 md:py-3 md:text-xs"
                  style={{
                    borderColor: isActive ? 'rgba(247,241,228,0.55)' : 'rgba(247,241,228,0.12)',
                    background: isActive ? 'rgba(247,241,228,0.12)' : 'transparent',
                    color: isActive ? 'rgba(247,241,228,1)' : 'rgba(247,241,228,0.46)',
                  }}
                >
                  <span className="truncate">{item.name}</span>
                  <span
                    aria-hidden
                    className="ml-3 shrink-0"
                    style={{
                      color: isActive ? 'rgba(247,241,228,0.92)' : 'rgba(247,241,228,0.22)',
                    }}
                  >
                    -&gt;
                  </span>
                </button>
            );
          })}
          </nav>
        </div>
      </div>
      </div>
    </aside>
  );
}
