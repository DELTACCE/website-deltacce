import React, { useEffect, useState } from 'react';
import galleryEventsConfig from '../data/gallery.json';
import { useGalleryAssets } from '../hooks/useGalleryAssets';
import GalleryHeader from '../components/gallery/GalleryHeader';
import GalleryNav from '../components/gallery/GalleryNav';
import GalleryEventSection from '../components/gallery/GalleryEventSection';

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
  const events = galleryEventsConfig;
  const { eventStatesByTag } = useGalleryAssets(events);
  const [activeEventId, setActiveEventId] = useState(getGallerySectionId(events[0]?.tag ?? ''));
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  // Suppress observer override for 800ms after a manual navigation click
  const navigatingRef = React.useRef(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (navigatingRef.current) return; // Ignore while manually navigating

        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        // Pick the section whose top edge is closest to (but below) the scroll top
        const best = visible.reduce((current, next) => {
          const currentTop = current.boundingClientRect.top;
          const nextTop = next.boundingClientRect.top;
          // Prefer the one whose top is highest on screen (smallest positive top, or closest to 0)
          return Math.abs(nextTop) < Math.abs(currentTop) ? next : current;
        });

        const bestId = best.target?.id ?? null;
        if (bestId) setActiveEventId(bestId);
      },
      {
        root: null,
        rootMargin: '-10% 0px -50% 0px', // Section must enter top 50% of viewport
        threshold: 0,
      }
    );

    const nodes = events
      .map((item) => document.getElementById(getGallerySectionId(item.tag)))
      .filter(Boolean);

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [events]);

  const handleNavigate = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    // Lock the active state immediately and suppress observer for 800ms
    setActiveEventId(sectionId);
    navigatingRef.current = true;
    setTimeout(() => { navigatingRef.current = false; }, 800);

    const headerOffset = 120;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40">
      <div className="mx-auto w-full px-6 lg:px-12 xl:px-16">
        {/* Page header */}
        <GalleryHeader />

        {/* GalleryNav: floats fixed on mobile (handled in component), column on desktop */}
        <GalleryNav
          events={events}
          activeEventId={activeEventId}
          onNavigate={handleNavigate}
          getGallerySectionId={getGallerySectionId}
        />

        {/* Desktop two-column layout */}
        <div className="flex flex-row md:gap-16 lg:gap-24">

          {/* Left spacer column on desktop only to match nav width */}
          <div className="hidden md:block w-44 lg:w-52 shrink-0" />

          {/* Content — full width on mobile, right column on desktop */}
          <div className="flex-1 min-w-0 flex flex-col gap-16 md:gap-32">
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
                  scrollContainerRef={{ current: null }}
                  prefersReducedMotion={prefersReducedMotion}
                />
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
