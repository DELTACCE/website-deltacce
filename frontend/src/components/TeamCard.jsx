import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { getDriveImageUrl } from '../data/committee';

function getNetworkQuality() {
  if (typeof navigator === 'undefined') {
    return 'q_auto:best';
  }

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (!connection) {
    return 'q_auto:best';
  }

  if (connection.saveData) {
    return 'q_auto:eco';
  }

  switch (connection.effectiveType) {
    case 'slow-2g':
    case '2g':
      return 'q_auto:eco';
    case '3g':
      return 'q_auto:good';
    default:
      return 'q_auto:best';
  }
}

function getOptimizedCloudinaryUrl(baseUrl, featured = false) {
  if (!baseUrl) {
    return '';
  }

  if (!baseUrl.includes('/upload/')) {
    return baseUrl;
  }

  const quality = getNetworkQuality();
  const width = featured ? 'w_720' : quality === 'q_auto:eco' ? 'w_360' : quality === 'q_auto:good' ? 'w_520' : 'w_640';
  const transforms = `f_auto,dpr_auto,c_fill,g_face,${width},${quality}`;

  return baseUrl.replace('/upload/', `/upload/${transforms}/`);
}

function useInViewOnce(rootMargin = '180px') {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      return undefined;
    }

    const node = ref.current;

    if (!node) {
      return undefined;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isInView, rootMargin]);

  return [ref, isInView];
}

export default function TeamCard({ member, featured = false }) {
  const [containerRef, isInView] = useInViewOnce(featured ? '320px' : '180px');
  const [imgSrc, setImgSrc] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const driveImageUrl = getDriveImageUrl(member.driveId);

    if (!driveImageUrl) {
      setImgSrc(`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=0e3061,065964&textColor=f7f1e4`);
      return;
    }

    setImgSrc(getOptimizedCloudinaryUrl(driveImageUrl, featured));
  }, [featured, isInView, member.driveId, member.name]);

  const handleImageError = () => {
    // Fallback seed avatar in case the Google Drive link fails
    setImgSrc(`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=0e3061,065964&textColor=f7f1e4`);
  };

  return (
    <div
      ref={containerRef}
      className={`group relative h-full bg-indigo border border-indigo/20 rounded-3xl transition-all duration-300 hover:border-signal/40 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(14,48,97,0.3)] select-none ${
        featured ? 'p-4 sm:p-5 md:flex md:gap-6 md:items-center md:col-span-2' : 'p-4 sm:p-5 md:p-5'
      } flex flex-row md:flex-col md:justify-start gap-4 md:gap-0`}
    >
      {/* Image container */}
      <div
        className={`relative overflow-hidden bg-indigo/5 rounded-2xl shrink-0 ${
          featured ? 'w-24 h-32 sm:w-28 sm:h-36 md:w-full md:h-36' : 'w-24 h-32 sm:w-28 sm:h-36 md:w-full md:h-44'
        } flex items-center justify-center`}
      >
        {!hasLoaded && <div className="absolute inset-0 bg-paper/10 animate-pulse" aria-hidden="true" />}
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={member.name}
            onError={handleImageError}
            onLoad={() => setHasLoaded(true)}
            loading={featured ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={featured ? 'high' : 'low'}
            className="w-full h-full object-cover md:object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out scale-100 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-indigo/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0 flex flex-col justify-center pt-1 md:pt-0">
        <div>
          <span className="font-heading text-[10px] md:text-xs text-signal font-bold uppercase tracking-wider block mb-1 leading-tight">
            {member.role} {member.batch && `// ${member.batch}`}
          </span>
          <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold text-paper group-hover:text-signal uppercase leading-tight tracking-wide mb-2 transition-colors duration-300">
            {member.name}
          </h3>
          {member.bio && (
            <p className="font-body text-[11px] sm:text-xs text-paper/70 leading-relaxed mb-3 max-w-sm font-light">
              {member.bio}
            </p>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex gap-3 mt-1">
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/40 hover:text-signal transition-colors duration-300"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Linkedin strokeWidth={1.5} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </a>
          )}
          {member.socials.instagram && (
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/40 hover:text-signal transition-colors duration-300"
              aria-label={`${member.name}'s Instagram`}
            >
              <Instagram strokeWidth={1.5} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </a>
          )}
          {member.socials.email && (
            <a
              href={member.socials.email}
              className="text-paper/40 hover:text-signal transition-colors duration-300"
              aria-label={`Email ${member.name}`}
            >
              <Mail strokeWidth={1.5} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
