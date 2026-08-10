import React from 'react';
import GalleryMediaCard from './GalleryMediaCard';
import GalleryMediaSkeleton from './GalleryMediaSkeleton';

export default function GalleryEventSection({
  item,
  sectionId,
  eventState,
  scrollContainerRef,
  prefersReducedMotion,
}) {
  const assets = eventState.assets || [];
  const isLoading = eventState.status === 'loading';
  const isError = eventState.status === 'error';
  const isEmpty = eventState.status === 'empty';

  return (
    <section
      id={sectionId}
      className="min-w-0 max-w-full overflow-hidden rounded-3xl border border-indigo/10 bg-paper/60 p-4 sm:p-5 md:p-6"
    >
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div>
          <div className="font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-teal">
            Event media
          </div>
          <h2 className="mt-2 font-heading text-xl font-extrabold uppercase tracking-tight text-indigo sm:text-2xl">
            {isLoading ? 'Loading media' : item.name}
          </h2>
        </div>
      </div>

      <div className="mt-5 min-w-0 max-w-full overflow-hidden">
        {isLoading ? (
          <GalleryMediaSkeleton />
        ) : isError ? (
          <div className="rounded-3xl border border-dashed border-indigo/15 bg-paper px-4 py-4 text-sm text-indigo/65">
            Unable to load media for this event right now.
          </div>
        ) : isEmpty || assets.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-indigo/15 bg-paper px-4 py-4 text-sm text-indigo/65">
            No media available for this event yet.
          </div>
        ) : (
          <div className="columns-1 gap-4 overflow-hidden sm:columns-2 xl:columns-3 [column-fill:_balance]">
            {assets.map((media) => (
              <GalleryMediaCard
                key={media.id}
                media={media}
                label={item.name}
                scrollRootRef={scrollContainerRef}
                canAutoplay={!prefersReducedMotion}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
