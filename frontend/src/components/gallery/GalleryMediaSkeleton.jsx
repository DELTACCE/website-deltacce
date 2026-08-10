import React from 'react';

export default function GalleryMediaSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div className="h-56 animate-pulse rounded-3xl bg-indigo/10" />
      <div className="h-72 animate-pulse rounded-3xl bg-indigo/10" />
      <div className="h-64 animate-pulse rounded-3xl bg-indigo/10" />
    </div>
  );
}
