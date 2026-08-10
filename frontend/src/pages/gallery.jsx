import React from 'react';
import { Image, LayoutGrid} from 'lucide-react';

export default function Gallery() {
  return (
    <div className="bg-paper px-6">
      <section className="min-h-[70vh] md:min-h-[85vh] flex items-center py-16 md:py-24">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="font-heading text-xs text-signal font-bold tracking-[0.25em] uppercase block mb-4">
              {"// GALLERY"}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-indigo uppercase leading-none tracking-tight mb-6">
              Visual archive
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo to-teal">
                coming soon.
              </span>
            </h1>
            <p className="font-body text-base md:text-lg text-ink/80 max-w-2xl leading-relaxed">
              This section is reserved for event photos, club highlights, and project snapshots.
              The full gallery layout will be added later.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-indigo/10 bg-paper/50 p-6 min-h-40 flex flex-col justify-between">
                <Image className="w-6 h-6 text-signal" />
                <div>
                  <p className="font-heading text-sm font-bold text-indigo uppercase tracking-wide">Photos</p>
                  <p className="mt-2 text-sm text-ink/70">Event coverage and campus moments.</p>
                </div>
              </div>
              <div className="rounded-3xl border border-indigo/10 bg-paper/50 p-6 min-h-40 flex flex-col justify-between">
                <LayoutGrid className="w-6 h-6 text-signal" />
                <div>
                  <p className="font-heading text-sm font-bold text-indigo uppercase tracking-wide">Moments</p>
                  <p className="mt-2 text-sm text-ink/70">Highlights from workshops and meetups.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
