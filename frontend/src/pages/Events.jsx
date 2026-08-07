import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { events } from '../data/events';
import { ArrowRight } from 'lucide-react';

export default function Events() {
  return (
    <div className="bg-paper px-6">
      <div className="max-w-5xl mx-auto">
        <section className="min-h-[60vh] md:min-h-[90vh] flex flex-col justify-center border-b border-indigo/10 pt-10 pb-16 md:pb-20 mb-12 md:mb-20">
          <span className="font-heading text-xs text-signal font-bold tracking-[0.25em] uppercase block mb-4">
            {"// PROGRAMS & EXPERIENCES"}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-indigo uppercase leading-none tracking-tight mb-6">
            Moments that move
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo to-teal">the community forward.</span>
          </h1>
          <p className="font-body text-base md:text-lg text-ink/80 max-w-2xl leading-relaxed">
            From launch events to hands-on sprints, every DELTA gathering is built to connect ideas, people, and opportunities.
          </p>
        </section>

        <section className="mb-12 md:mb-20">
          <SectionHeading eyebrow="01 / HIGHLIGHTS" heading="Featured Events" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {events.map((event) => (
              <Link
                key={event.slug}
                to={`/events/${event.slug}`}
                className="group border border-indigo/10 bg-paper/40 rounded-3xl p-7 flex flex-col gap-4 hover:border-signal/30 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(14,48,97,0.3)] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-[10px] text-teal font-bold tracking-[0.25em] uppercase">
                    Upcoming
                  </span>
                  <span className="text-signal text-sm font-semibold">{event.date}</span>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-extrabold text-indigo uppercase tracking-wide mb-2 group-hover:text-signal transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-ink/75">
                    {event.tagline}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-indigo/10 pt-4 text-sm">
                  <span className="font-body text-ink/60">{event.location}</span>
                  <span className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase text-signal">
                    Explore
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
