import React, { useEffect, useRef, useState } from 'react';
import galleryEventsConfig from '../data/gallery.json';
import { useGalleryAssets } from '../hooks/useGalleryAssets';
import GallerySidebar from '../components/gallery/GallerySidebar';
import GalleryEventSection from '../components/gallery/GalleryEventSection';

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function getGallerySectionId(tag) {
  return tag.replace(/^event_/, 'event-').replace(/_/g, '-');
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener('change', updateMatches);

    return () => {
      mediaQuery.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
}

export default function Gallery() {
  const scrollContainerRef = useRef(null);
  const events = galleryEventsConfig;
  const { eventStatesByTag } = useGalleryAssets(events);
  const [activeEventId, setActiveEventId] = useState(getGallerySectionId(events[0]?.tag ?? ''));
  const isDesktopLayout = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  useEffect(() => {
    const root = isDesktopLayout ? scrollContainerRef.current : null;

    if (typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) {
          return;
        }

        const rootCenter = isDesktopLayout && root ? root.clientHeight / 2 : window.innerHeight / 2;
        const best = visible.reduce((current, next) => {
          if (next.intersectionRatio !== current.intersectionRatio) {
            return next.intersectionRatio > current.intersectionRatio ? next : current;
          }

          const currentCenter =
            current.boundingClientRect.top + current.boundingClientRect.height / 2;
          const nextCenter = next.boundingClientRect.top + next.boundingClientRect.height / 2;
          const currentDistance = Math.abs(currentCenter - rootCenter);
          const nextDistance = Math.abs(nextCenter - rootCenter);

          return nextDistance < currentDistance ? next : current;
        });

        const bestId = best.target?.id ?? null;
        if (bestId) {
          setActiveEventId(bestId);
        }
      },
      {
        root,
        rootMargin: isDesktopLayout ? '-16% 0px -16% 0px' : '-12% 0px -12% 0px',
        threshold: [0.1, 0.25, 0.45, 0.6, 0.8],
      }
    );

    const nodes = events
      .map((item) => document.getElementById(getGallerySectionId(item.tag)))
      .filter(Boolean);

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [events, isDesktopLayout]);

  const handleNavigate = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (isDesktopLayout) {
      const container = scrollContainerRef.current;
      if (!container) return;

      const targetTop =
        target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;

      container.scrollTo({
        top: targetTop,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    } else {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }

    setActiveEventId(sectionId);
  };

  const galleryShellClassName = isDesktopLayout
    ? 'h-full overflow-hidden'
    : 'min-h-screen overflow-visible';
  const galleryShellStyle = isDesktopLayout
    ? { height: 'calc(100dvh - var(--navbar-height, 0px))' }
    : undefined;

  return (
    <div className={`bg-paper ${galleryShellClassName}`} style={galleryShellStyle}>
      <div className="mx-auto h-full w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full min-h-0 flex-col gap-4 md:grid md:min-h-0 md:items-stretch md:gap-0 md:[grid-template-columns:34%_66%] md:[grid-template-rows:minmax(0,1fr)]">
          <GallerySidebar
            events={events}
            activeEventId={activeEventId}
            onNavigate={handleNavigate}
            getGallerySectionId={getGallerySectionId}
          />

          <section
            ref={scrollContainerRef}
            className={`min-h-0 min-w-0 ${
              isDesktopLayout
                ? 'h-full self-stretch overflow-y-auto overscroll-contain md:pl-6 md:pt-10 md:pb-10'
                : 'overflow-visible pb-8'
            }`}
            aria-label="Gallery scroll container"
          >
            <div className="grid gap-4 md:gap-6">
              {events.map((item) => {
                const sectionId = getGallerySectionId(item.tag);
                const eventState = eventStatesByTag[item.tag] || {
                  status: 'loading',
                  assets: [],
                  error: null,
                };

                return (
                  <GalleryEventSection
                    key={item.tag}
                    item={item}
                    sectionId={sectionId}
                    eventState={eventState}
                    scrollContainerRef={scrollContainerRef}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
