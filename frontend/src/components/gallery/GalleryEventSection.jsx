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
      className="min-w-0 max-w-full"
    >
      <div className="mb-10 flex min-w-0 items-center gap-4">
        <h2 className="font-heading text-lg font-bold uppercase tracking-[0.2em] text-indigo">
          {isLoading ? 'Loading media' : item.name}
        </h2>
        <div className="h-px flex-1 bg-indigo/10" />
      </div>

      <div className="min-w-0 max-w-full">
        {isLoading ? (
          <GalleryMediaSkeleton />
        ) : isError ? (
          <div className="rounded-none border border-dashed border-indigo/15 px-4 py-8 text-center text-sm font-light text-indigo/65">
            Unable to load media for this event right now.
          </div>
        ) : isEmpty || assets.length === 0 ? (
          <div className="rounded-none border border-dashed border-indigo/15 px-4 py-8 text-center text-sm font-light text-indigo/65">
            No media available for this event yet.
          </div>
        ) : (
          <div className="columns-2 gap-3 sm:columns-2 md:columns-2 xl:columns-3 2xl:columns-4 [column-fill:_balance]">
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
