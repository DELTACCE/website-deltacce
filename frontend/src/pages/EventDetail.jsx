import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { events } from '../data/events';
import { ArrowLeft, CalendarDays, MapPin, Users, Sparkles, ArrowRight } from 'lucide-react';

export default function EventDetail() {
  const { slug } = useParams();
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    return (
      <div className="bg-paper px-6 pt-31 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Link to="/events" className="inline-flex items-center gap-2 text-signal font-heading text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to events
          </Link>
          <div className="border border-indigo/10 rounded-3xl p-10 bg-paper/40">
            <h1 className="font-heading text-3xl font-extrabold text-indigo uppercase mb-4">Event not found</h1>
            <p className="font-body text-ink/80">The event you’re looking for is not available right now.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper px-6 pt-31 pb-20">
      <div className="max-w-5xl mx-auto">
        <Link to="/events" className="inline-flex items-center gap-2 text-signal font-heading text-xs font-bold uppercase tracking-[0.2em] mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to events
        </Link>

        <section className="border border-indigo/10 bg-paper/40 rounded-[2rem] p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="font-heading text-[10px] text-teal font-bold tracking-[0.25em] uppercase block mb-3">
                {"// EVENT DETAIL"}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-indigo uppercase leading-tight tracking-tight">
                {event.title}
              </h1>
              {event.subtitle ? (
                <p className="font-heading text-sm text-signal uppercase tracking-[0.2em] mt-3">
                  {event.subtitle}
                </p>
              ) : null}
            </div>
            <div className="inline-flex items-center gap-2 border border-signal/20 bg-signal/10 text-signal px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              {event.date}
            </div>
          </div>

          <p className="font-body text-lg text-ink/80 leading-relaxed max-w-3xl mb-8">
            {event.blurb}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="border border-indigo/10 rounded-2xl p-4 bg-paper/70">
              <div className="flex items-center gap-2 text-teal font-heading text-[10px] uppercase tracking-[0.2em] mb-2">
                <CalendarDays className="w-4 h-4" />
                Date
              </div>
              <p className="font-body text-sm text-ink/80">{event.date}</p>
            </div>
            <div className="border border-indigo/10 rounded-2xl p-4 bg-paper/70">
              <div className="flex items-center gap-2 text-teal font-heading text-[10px] uppercase tracking-[0.2em] mb-2">
                <MapPin className="w-4 h-4" />
                Venue
              </div>
              <p className="font-body text-sm text-ink/80">{event.location}</p>
            </div>
            <div className="border border-indigo/10 rounded-2xl p-4 bg-paper/70">
              <div className="flex items-center gap-2 text-teal font-heading text-[10px] uppercase tracking-[0.2em] mb-2">
                <Users className="w-4 h-4" />
                Audience
              </div>
              <p className="font-body text-sm text-ink/80">{event.audience}</p>
            </div>
          </div>

          <div className="border border-indigo/10 rounded-3xl p-6 bg-indigo/5">
            <h2 className="font-heading text-lg font-extrabold text-indigo uppercase tracking-wide mb-3">Format</h2>
            <p className="font-body text-sm text-ink/80 leading-relaxed">{event.format}</p>
            <div className="border-t border-indigo/10 mt-4 pt-4">
              <p className="font-heading text-[10px] uppercase tracking-[0.25em] text-teal mb-2">Theme</p>
              <p className="font-body text-sm text-ink/80 leading-relaxed">{event.tagline}</p>
            </div>
          </div>

          <div className="border border-indigo/10 rounded-3xl p-6 bg-paper/70 mt-8">
            <h2 className="font-heading text-lg font-extrabold text-indigo uppercase tracking-wide mb-4">Overview</h2>
            <div className="space-y-3">
              {event.overview?.map((paragraph) => (
                <p key={paragraph} className="font-body text-sm text-ink/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-heading text-lg font-extrabold text-indigo uppercase tracking-wide mb-4">Day resources</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {event.days?.map((day) => (
                <Link
                  key={day.slug}
                  to={`/events/${event.slug}/${day.slug}`}
                  className="group border border-indigo/10 bg-paper/70 rounded-3xl p-6 hover:border-signal/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading text-[10px] text-teal font-bold tracking-[0.25em] uppercase">
                      {day.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-signal transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold text-indigo uppercase tracking-wide mb-2 group-hover:text-signal transition-colors duration-300">
                    {day.title}
                  </h3>
                  <p className="font-body text-sm text-ink/80 leading-relaxed">{day.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
