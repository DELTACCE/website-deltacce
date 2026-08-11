import React from 'react';
import ReactDOM from 'react-dom';
import { buildCloudinaryDeliveryUrl, buildCloudinaryImageSrcSet } from '../../utils/cloudinary';

function GalleryMediaVideo({ media, label, scrollRootRef, canAutoplay }) {
  const videoRef = React.useRef(null);
  const isVisibleRef = React.useRef(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoUrl = buildCloudinaryDeliveryUrl(media.url, 'f_auto,q_auto:eco');

  const isHoverDevice = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  React.useEffect(() => {
    const video = videoRef.current;
    const root = scrollRootRef.current;

    if (!video) {
      return undefined;
    }

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const stopVideo = () => {
      video.pause();
    };

    if (!canAutoplay) {
      stopVideo();
      return undefined;
    }

    // No autoplay anywhere. Desktop plays on hover, touch plays on tap.
    // Observer only pauses videos scrolled out of view.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const shouldPlay = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.65);
        isVisibleRef.current = shouldPlay;

        if (!shouldPlay) {
          video.pause();
        }
      },
      {
        root: root || null,
        threshold: [0, 0.25, 0.5, 0.65, 0.8, 1],
      }
    );

    observer.observe(video);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopVideo();
    };
  }, [canAutoplay, scrollRootRef]);

  const handleMouseEnter = () => {
    if (isHoverDevice()) {
      videoRef.current?.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (isHoverDevice()) {
      videoRef.current?.pause();
    }
  };

  // Touch: tap toggles play/pause. Hover devices ignore (mouseenter handles it).
  const handleClick = () => {
    if (isHoverDevice()) {
      return;
    }
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={videoUrl}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onLoadedData={() => setIsLoaded(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`block h-full w-full object-contain cursor-pointer motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out motion-reduce:transition-none group-hover:scale-[1.03] ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Play affordance — shown when paused. Hidden on hover devices via CSS. */}
      {!isPlaying && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center [@media(hover:hover)_and_(pointer:fine)]:hidden"
          aria-hidden="true"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#f4f0ea">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      )}
    </>
  );
}

/* ─── HD Image Modal (rendered via portal at document.body) ─── */
function ImageModal({ src, alt, onClose }) {
  // Close on Escape key
  React.useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 10, 10, 0.96)',
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        aria-label="Close"
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: '2.5rem',
          height: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#f4f0ea',
          transition: 'background 0.2s',
        }}
        onClick={onClose}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(254,87,42,0.85)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image — centred, constrained so it never bleeds into chrome */}
      <div
        style={{
          maxWidth: 'min(92vw, 1100px)',
          maxHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '88vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '0.5rem',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          }}
        />
      </div>
    </div>,
    document.body
  );
}

function GalleryMediaImage({ media, label }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const deliveryUrl = buildCloudinaryDeliveryUrl(media.url, 'f_auto,q_auto:eco');
  const hdUrl = buildCloudinaryDeliveryUrl(media.url, 'f_auto,q_auto:best');
  const srcSet = buildCloudinaryImageSrcSet(media.url);

  return (
    <>
      <img
        src={deliveryUrl}
        srcSet={srcSet}
        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 44vw, 100vw"
        alt={media.alt || label}
        width={media.width}
        height={media.height}
        loading="lazy"
        decoding="async"
        onClick={() => setIsModalOpen(true)}
        onLoad={() => setIsLoaded(true)}
        className={`block h-full w-full object-contain cursor-zoom-in motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out motion-reduce:transition-none group-hover:scale-[1.03] ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {isModalOpen && (
        <ImageModal
          src={hdUrl}
          alt={`HD — ${media.alt || label}`}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default function GalleryMediaCard({
  media,
  label,
  scrollRootRef,
  canAutoplay,
}) {
  return (
    <article className="mb-3 md:mb-10 inline-block w-full break-inside-avoid">
      <figure className="group relative w-full overflow-hidden bg-indigo/5">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: media.aspectRatio }}
        >
          {media.type === 'video' ? (
            <GalleryMediaVideo
              media={media}
              label={label}
              scrollRootRef={scrollRootRef}
              canAutoplay={canAutoplay}
            />
          ) : (
            <GalleryMediaImage media={media} label={label} />
          )}
        </div>
      </figure>
      <div className="mt-4 text-left">
        <p className="font-heading text-[9px] font-bold uppercase tracking-[0.25em] text-indigo/60">
          {label}
        </p>
      </div>
    </article>
  );
}
