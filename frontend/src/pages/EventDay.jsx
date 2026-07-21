import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle2, Compass, Sparkles } from 'lucide-react';
import { events } from '../data/events';

function renderSection(section, index) {
  if (section.type === 'checklist') {
    return (
      <div key={index} className="border-t border-indigo/10 pt-6">
        <div className="flex items-center gap-2 text-teal font-heading text-[10px] uppercase tracking-[0.2em] mb-3">
          <Compass className="w-4 h-4" />
          {section.title}
        </div>
        <ul className="space-y-3">
          {section.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-signal mt-1" />
              <span className="font-body text-sm text-ink/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (section.type === 'cards') {
    return (
      <div key={index} className="border border-indigo/10 rounded-3xl p-6 bg-indigo/5">
        <h2 className="font-heading text-lg font-extrabold text-indigo uppercase tracking-wide mb-4">
          {section.title}
        </h2>
        <ul className="space-y-3">
          {section.items.map((item) => (
            <li key={item} className="font-body text-sm text-ink/80 leading-relaxed border-b border-indigo/10 pb-3 last:border-b-0 last:pb-0">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div key={index} className="border-t border-indigo/10 pt-6">
      <div className="flex items-center gap-2 text-teal font-heading text-[10px] uppercase tracking-[0.2em] mb-3">
        <BookOpen className="w-4 h-4" />
        {section.title}
      </div>
      <ul className="space-y-3">
        {section.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-signal mt-2"></span>
            <span className="font-body text-sm text-ink/80 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EventDay() {
  const { slug, daySlug } = useParams();
  const event = events.find((item) => item.slug === slug);
  const day = event?.days?.find((item) => item.slug === daySlug);

  if (!event || !day) {
    return (
      <div className="bg-paper px-6 pt-31 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Link to="/events" className="inline-flex items-center gap-2 text-signal font-heading text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to events
          </Link>
          <div className="border border-indigo/10 rounded-3xl p-10 bg-paper/40">
            <h1 className="font-heading text-3xl font-extrabold text-indigo uppercase mb-4">Resource page not found</h1>
            <p className="font-body text-ink/80">The selected day resource is not available right now.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper px-6 pt-31 pb-20">
      <div className="max-w-5xl mx-auto">
        <Link to={`/events/${event.slug}`} className="inline-flex items-center gap-2 text-signal font-heading text-xs font-bold uppercase tracking-[0.2em] mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to event overview
        </Link>

        <section className="border border-indigo/10 bg-paper/40 rounded-[2rem] p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <span className="font-heading text-[10px] text-teal font-bold tracking-[0.25em] uppercase block mb-3">
                {"// DAY RESOURCE"}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-indigo uppercase leading-tight tracking-tight">
                {day.title}
              </h1>
              <p className="font-heading text-sm text-signal uppercase tracking-[0.2em] mt-3">
                {event.title}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 border border-signal/20 bg-signal/10 text-signal px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              {day.label}
            </div>
          </div>

          <p className="font-body text-lg text-ink/80 leading-relaxed max-w-3xl mb-8">
            {day.summary}
          </p>

          <div className="space-y-6">
            {day.sections?.map((section, index) => renderSection(section, index))}
          </div>
        </section>
      </div>
    </div>
  );
}
