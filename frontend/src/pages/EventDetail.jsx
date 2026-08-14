import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { events } from '../data/events';
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  Clock,
  User,
  Award,
  Layers,
  Target,
  Trophy,
  Lock,
  Send,
  ShieldCheck,
  Github,
  FileCode
} from 'lucide-react';

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
    <div className="px-6 pt-31 pb-20">
      <div className="max-w-5xl mx-auto">
        <Link to="/events" className="inline-flex items-center gap-2 text-signal font-heading text-xs font-bold uppercase tracking-[0.2em] mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to events
        </Link>

        <section className="relative border border-indigo/15 bg-paper/65 backdrop-blur-md backdrop-saturate-150 shadow-[0_12px_32px_rgba(14,48,97,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-[2rem] p-8 md:p-12 overflow-hidden">
          <div className="relative z-10 space-y-10">

            {/* Header / Hero */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
                <div>
                  <span className="font-heading text-[10px] text-teal font-bold tracking-[0.25em] uppercase block mb-3">
                    {"// EVENT DETAIL"}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-indigo uppercase leading-tight tracking-tight">
                    {event.title}
                  </h1>
                  {event.subtitle && (
                    <p className="font-heading text-sm text-signal uppercase tracking-[0.2em] mt-3">
                      {event.subtitle}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {event.status && (
                    <div className="inline-flex items-center gap-2 border border-teal/30 bg-teal/10 text-teal px-4 py-2 rounded-full text-xs font-bold font-heading uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      {event.status}
                    </div>
                  )}
                  <div className="inline-flex items-center gap-2 border border-signal/20 bg-signal/10 text-signal px-4 py-2 rounded-full text-xs font-bold font-heading uppercase tracking-wider">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {event.date}
                  </div>
                  <Link
                    to={`/events/${event.slug}/login`}
                    className="inline-flex items-center gap-2 border border-indigo/20 bg-indigo hover:bg-indigo/90 text-white font-heading text-xs font-bold uppercase tracking-[0.18em] px-5 py-2 rounded-full shadow-sm hover:shadow transition-all duration-300"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Team Login
                  </Link>
                </div>
              </div>

              <p className="font-body text-lg text-ink/80 leading-relaxed max-w-4xl">
                {event.blurb}
              </p>
            </div>

            {/* Prominent Team Submission Portal Banner */}
            <div className="relative border-2 border-signal/40 bg-indigo/5 rounded-3xl p-8 shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 text-signal font-heading text-[10px] font-bold uppercase tracking-[0.25em] bg-signal/10 border border-signal/20 px-3 py-1 rounded-full">
                    <Send className="w-3.5 h-3.5" /> Final Project Submission Portal
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-indigo uppercase tracking-wide">
                    TEAM SUBMISSION PORTAL
                  </h2>
                  <p className="font-body text-sm text-ink/80 max-w-xl">
                    Submit your final project GitHub repository and presentation before the final deadline on <strong className="text-indigo">17 August 2026</strong>.
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                  <Link
                    to={`/events/${event.slug}/login`}
                    className="inline-flex items-center gap-2.5 bg-indigo hover:bg-indigo/90 text-white font-heading text-sm font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Lock className="w-4 h-4" />
                    Team Login
                  </Link>
                  <span className="font-heading text-[10px] text-ink/60 uppercase tracking-widest">
                    Deadline: 17 August 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Event Information Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-indigo/10 rounded-2xl p-5 bg-paper/70">
                <div className="flex items-center gap-2 text-teal font-heading text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">
                  <CalendarDays className="w-4 h-4" />
                  Date
                </div>
                <p className="font-body text-sm font-semibold text-ink/85">{event.date}</p>
              </div>

              <div className="border border-indigo/10 rounded-2xl p-5 bg-paper/70">
                <div className="flex items-center gap-2 text-teal font-heading text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">
                  <MapPin className="w-4 h-4" />
                  Venue
                </div>
                <p className="font-body text-sm font-semibold text-ink/85">{event.location}</p>
              </div>

              <div className="border border-indigo/10 rounded-2xl p-5 bg-paper/70">
                <div className="flex items-center gap-2 text-teal font-heading text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">
                  <Users className="w-4 h-4" />
                  Audience
                </div>
                <p className="font-body text-sm font-semibold text-ink/85">{event.audience}</p>
              </div>

              <div className="border border-indigo/10 rounded-2xl p-5 bg-paper/70">
                <div className="flex items-center gap-2 text-teal font-heading text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">
                  <Layers className="w-4 h-4" />
                  Format
                </div>
                <p className="font-body text-sm font-semibold text-ink/85">{event.format}</p>
              </div>
            </div>

            {/* Event Highlights Stats Bar */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="border border-indigo/10 rounded-3xl p-6 bg-indigo/5">
                <h2 className="font-heading text-xs font-bold text-teal uppercase tracking-[0.25em] mb-4">
                  {"// EVENT HIGHLIGHTS"}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {event.highlights.map((h, idx) => (
                    <div key={idx} className="border border-indigo/10 rounded-2xl p-4 bg-paper/80 text-center">
                      <p className="font-heading text-lg font-extrabold text-indigo">{h.value}</p>
                      <p className="font-heading text-[10px] text-ink/60 uppercase tracking-wider mt-1">{h.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Format Details */}
            {event.formatDetails && (
              <div className="border border-indigo/10 rounded-3xl p-6 bg-paper/70">
                <h2 className="font-heading text-lg font-extrabold text-indigo uppercase tracking-wide mb-4">
                  Format Breakdown
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {event.formatDetails.map((f, idx) => (
                    <div key={idx} className="border border-indigo/10 rounded-2xl p-5 bg-indigo/5">
                      <span className="font-heading text-[10px] text-signal font-bold uppercase tracking-widest block mb-1">
                        {f.date}
                      </span>
                      <h3 className="font-heading text-base font-extrabold text-indigo uppercase mb-2">
                        {f.title}
                      </h3>
                      <p className="font-body text-sm text-ink/80 leading-relaxed">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            {event.overview && event.overview.length > 0 && (
              <div className="border border-indigo/10 rounded-3xl p-6 bg-paper/70">
                <h2 className="font-heading text-lg font-extrabold text-indigo uppercase tracking-wide mb-4">
                  Event Overview
                </h2>
                <div className="space-y-3">
                  {event.overview.map((paragraph, idx) => (
                    <p key={idx} className="font-body text-sm text-ink/80 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Workshop Day Schedule */}
            {event.workshopSchedule && (
              <div className="border border-indigo/10 rounded-3xl p-6 bg-paper/70">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-signal" />
                  <h2 className="font-heading text-lg font-extrabold text-indigo uppercase tracking-wide">
                    Phase 1: Workshop Schedule – 8 August 2026
                  </h2>
                </div>
                <div className="space-y-3">
                  {event.workshopSchedule.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border-b border-indigo/10 pb-3 last:border-b-0 last:pb-0">
                      <span className="font-heading text-xs font-bold text-signal bg-signal/10 px-3 py-1.5 rounded-full shrink-0 w-max">
                        {item.time}
                      </span>
                      <div>
                        <h3 className="font-heading text-sm font-extrabold text-indigo uppercase">
                          {item.title}
                        </h3>
                        <p className="font-body text-xs text-ink/75">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Build Sprint */}
            {event.buildSprintInfo && (
              <div className="border border-indigo/10 rounded-3xl p-6 bg-indigo/5">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-teal" />
                  <h2 className="font-heading text-lg font-extrabold text-indigo uppercase tracking-wide">
                    Phase 2: Product Build Sprint ({event.buildSprintInfo.date})
                  </h2>
                </div>
                <p className="font-body text-sm text-ink/80 leading-relaxed mb-6">
                  {event.buildSprintInfo.description}
                </p>
                <div className="border border-indigo/10 rounded-2xl p-5 bg-paper/80">
                  <h3 className="font-heading text-sm font-extrabold text-indigo uppercase mb-3">
                    Final Submission Deliverables:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 border border-indigo/10 p-4 rounded-xl bg-paper">
                      <Github className="w-5 h-5 text-signal shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-heading text-xs font-bold text-indigo uppercase mb-1">1. GitHub Repository</h4>
                        <p className="font-body text-xs text-ink/75">Valid GitHub repository URL containing full working source code and documentation.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border border-indigo/10 p-4 rounded-xl bg-paper">
                      <FileCode className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-heading text-xs font-bold text-indigo uppercase mb-1">2. Presentation File</h4>
                        <p className="font-body text-xs text-ink/75">Project presentation slides in .ppt or .pptx format summarizing the solution.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Resource Person */}
            {event.resourcePerson && (
              <div className="border border-indigo/10 rounded-3xl p-6 bg-indigo/5">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-signal" />
                  <h2 className="font-heading text-lg font-extrabold text-indigo uppercase tracking-wide">
                    Resource Person
                  </h2>
                </div>
                <div className="border border-indigo/10 rounded-2xl p-6 bg-paper/80">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {event.resourcePerson.image && (
                      <div className="w-full md:w-48 h-56 md:h-52 shrink-0 rounded-2xl overflow-hidden border border-indigo/15 shadow-md bg-indigo/10">
                        <img
                          src={event.resourcePerson.image}
                          alt={event.resourcePerson.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-heading text-xl md:text-2xl font-extrabold text-indigo uppercase">
                          {event.resourcePerson.name}
                        </h3>
                        <p className="font-heading text-xs font-bold text-signal uppercase tracking-wider mt-1">
                          {event.resourcePerson.role}
                        </p>
                      </div>
                      <p className="font-body text-sm text-ink/80 leading-relaxed">
                        {event.resourcePerson.bio}
                      </p>
                      <ul className="space-y-2 border-t border-indigo/10 pt-4">
                        {event.resourcePerson.highlights.map((hl, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Award className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                            <span className="font-body text-xs text-ink/80 leading-relaxed">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Why Participate */}
            {event.whyParticipate && (
              <div className="border border-indigo/10 rounded-3xl p-6 bg-paper/70">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-signal" />
                  <h2 className="font-heading text-lg font-extrabold text-indigo uppercase tracking-wide">
                    Why Participate
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {event.whyParticipate.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 border border-indigo/10 rounded-xl p-3.5 bg-paper/80">
                      <Sparkles className="w-4 h-4 text-teal shrink-0" />
                      <span className="font-body text-sm text-ink/85 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Day Resources Links */}
            {event.days && event.days.length > 0 && (
              <div>
                <h2 className="font-heading text-lg font-extrabold text-indigo uppercase tracking-wide mb-4">
                  Event Phases & Resources
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {event.days.map((day) => (
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
            )}

            {/* Closing Tagline & Admin Link */}
            <div className="space-y-4">
              {event.philosophy && (
                <div className="border border-signal/20 bg-gradient-to-r from-signal/10 via-indigo/10 to-teal/10 rounded-3xl p-8 text-center shadow-lg">
                  <p className="font-heading text-xs text-teal font-bold tracking-[0.3em] uppercase mb-2">
                    {"// EVENT PHILOSOPHY"}
                  </p>
                  <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-indigo uppercase tracking-wide">
                    "{event.philosophy}"
                  </h3>
                </div>
              )}
              
              {/* Subtle Admin Login Link */}
              <div className="text-center pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 font-heading text-[11px] font-semibold text-ink/40 hover:text-indigo transition-colors uppercase tracking-wider"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin Login
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
