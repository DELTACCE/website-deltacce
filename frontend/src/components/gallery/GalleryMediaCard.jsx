import React from 'react';
import { buildCloudinaryDeliveryUrl, buildCloudinaryImageSrcSet } from '../../utils/cloudinary';

function GalleryMediaVideo({ media, label, scrollRootRef, canAutoplay }) {
  const videoRef = React.useRef(null);
  const isVisibleRef = React.useRef(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const videoUrl = buildCloudinaryDeliveryUrl(media.url, 'f_auto,q_auto');

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

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const shouldPlay = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.65);
        isVisibleRef.current = shouldPlay;

        if (shouldPlay) {
          video.play().catch(() => {});
        } else {
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
      } else if (isVisibleRef.current) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopVideo();
    };
  }, [canAutoplay, scrollRootRef]);

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      onLoadedData={() => setIsLoaded(true)}
      className={`block h-full w-full object-contain motion-safe:transition-opacity motion-safe:duration-500 motion-reduce:transition-none ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}

function GalleryMediaImage({ media, label }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const deliveryUrl = buildCloudinaryDeliveryUrl(media.url, 'f_auto,q_auto');
  const srcSet = buildCloudinaryImageSrcSet(media.url);

  return (
    <img
      src={deliveryUrl}
      srcSet={srcSet}
      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 44vw, 100vw"
      alt={media.alt || label}
      width={media.width}
      height={media.height}
      loading="lazy"
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      className={`block h-full w-full object-contain motion-safe:transition-opacity motion-safe:duration-500 motion-reduce:transition-none ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}

export default function GalleryMediaCard({
  media,
  label,
  scrollRootRef,
  canAutoplay,
}) {
  return (
    <article className="mb-4 inline-block w-full break-inside-avoid">
      <figure className="overflow-hidden rounded-3xl border border-indigo/10 bg-paper shadow-[0_18px_42px_rgba(12,23,64,0.08)]">
        <div
          className="relative w-full overflow-hidden bg-indigo/5"
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
    </article>
  );
}
