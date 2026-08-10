import { useEffect, useState } from 'react';
import { loadCloudinaryAssets } from '../utils/cloudinary';

export function useGalleryAssets(events) {
  const [eventStatesByTag, setEventStatesByTag] = useState({});

  useEffect(() => {
    let isMounted = true;

    setEventStatesByTag(
      Object.fromEntries(
        events.map((event) => [event.tag, { status: 'loading', assets: [], error: null }])
      )
    );

    events.forEach((event) => {
      loadCloudinaryAssets(event.tag).then((result) => {
        if (!isMounted) {
          return;
        }

        setEventStatesByTag((current) => ({
          ...current,
          [event.tag]: result,
        }));
      });
    });

    return () => {
      isMounted = false;
    };
  }, [events]);

  return { eventStatesByTag };
}
