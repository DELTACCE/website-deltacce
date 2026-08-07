import React from 'react';
import { Database, Cpu, Layers, BarChart3, Binary, Zap, BookOpen, Code, Users, Trophy, Compass, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Card from '../components/Card';
import ScrollReveal from '../components/ScrollReveal';

export default function About() {
  const focusAreas = [
    { icon: Database, label: "Data Science" },
    { icon: Cpu, label: "Artificial Intelligence" },
    { icon: Layers, label: "Machine Learning" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Binary, label: "Programming" },
    { icon: Zap, label: "Innovation" }
  ];

  const whyJoinReasons = [
    {
      icon: BookOpen,
      title: "Learn",
      description: "Access curated workshops, masterclasses, and peer-to-peer coding sessions covering advanced topics in AI, analytics, and software architecture."
    },
    {
      icon: Code,
      title: "Build",
      description: "Gain hands-on experience by collaborating on real-world projects, building applications from scratch, and participating in open-source incubation."
    },
    {
      icon: Users,
      title: "Collaborate",
      description: "Join an active circle of developers, creators, and analysts who share code, exchange research papers, and work together on technical challenges."
    },
    {
      icon: Trophy,
      title: "Compete",
      description: "Participate in internal hackathons, capture-the-flag competitions, and receive support to compete in national-level tournaments."
    },
    {
      icon: Compass,
      title: "Lead",
      description: "Take charge of technical projects, coordinate major events, mentor juniors, and build high-demand management and leadership skills."
    }
  ];

  return (
    <div className="bg-paper px-6">

      {/* 1. HERO SECTION */}
      <section className="relative pb-16 md:pb-20 pt-10 border-b border-indigo/10 min-h-[70vh] md:min-h-[110vh] flex flex-col justify-center">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <ScrollReveal className="lg:col-span-8" delay={0.1}>
            <span className="font-heading text-xs text-signal font-bold tracking-[0.25em] uppercase block mb-4">
              {"// ABOUT US"}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-indigo uppercase leading-none tracking-tight mb-8">
              Data Oriented.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo to-teal">Innovation Driven.</span>
            </h1>
            <p className="font-body text-lg text-ink/80 leading-relaxed max-w-3xl">
              DELTA (Data Oriented Thinkers' Association) is formed as a collaborative community within the Department of Computer Science & Engineering (Data Science) at Christ College of Engineering. We seek to cultivate analytical minds capable of decoding complex problems and building state-of-the-art intelligent systems.
            </p>
          </ScrollReveal>
          <ScrollReveal className="hidden lg:block lg:col-span-4 self-center select-none" delay={0.3} direction="left">
            <div className="relative p-6 border border-indigo/10 bg-paper/30 flex flex-col justify-between h-48 w-full rounded-3xl">
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-signal rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-signal rounded-bl-3xl"></div>
              <span className="font-heading text-xs text-indigo/30 uppercase tracking-widest">{"// CCE_DS_DEPT"}</span>
              <span className="font-heading text-5xl font-bold text-indigo/10 align-bottom self-end">SYS_v1.0</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. THE ORIGIN STORY */}
      <section className="py-12 md:py-24 px-6 border-b border-indigo/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="01 / TIMELINE" heading="Our Origin" />
          </div>
          <div className="lg:col-span-8 font-body text-base text-ink/80 leading-relaxed space-y-6">
            <p>
              Founded in 2026, DELTA emerged from a simple realization: while traditional academic curricula provide essential foundations, the fast-paced advancements in Data Science, Artificial Intelligence, and Big Data demand rapid, hands-on, and practical exploration.
            </p>
            <p>
              Students and faculty coordinators in the Data Science department proposed a unified association to bridge the gap between textbook formulas and production-grade applications. DELTA was designed to serve as a launchpad where students learn, build, and deploy code together.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 select-none">
              <div className="border border-indigo/10 p-4 bg-paper/50 rounded-2xl">
                <span className="font-heading text-3xl font-bold text-signal block">2026</span>
                <span className="font-body text-xs text-indigo font-bold uppercase tracking-wider">Year Founded</span>
              </div>
              <div className="border border-indigo/10 p-4 bg-paper/50 rounded-2xl">
                <span className="font-heading text-3xl font-bold text-signal block">100+</span>
                <span className="font-body text-xs text-indigo font-bold uppercase tracking-wider">Active Members</span>
              </div>
              <div className="border border-indigo/10 p-4 bg-paper/50 col-span-2 md:col-span-1 rounded-2xl">
                <span className="font-heading text-3xl font-bold text-signal block">6+</span>
                <span className="font-body text-xs text-indigo font-bold uppercase tracking-wider">Focus Fields</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION, VISION & VALUES */}
      <section className="py-12 md:py-24 px-6 border-b border-indigo/10 bg-paper/30">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="02 / BLUEPRINT" heading="Values & Direction" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card
              title="Our Mission"
              description="To provide students with collaborative spaces, resources, and technical support to learn, build, and deploy data systems and Artificial Intelligence solutions."
            />
            <Card
              title="Our Vision"
              description="To construct a premier student research ecosystem at CCE recognized for computational excellence, creativity, and ethical design in emerging technology."
            />
            <Card
              title="Core Values"
              description="Built on three fundamental guidelines: Analytical Rigor in problem-solving, Creative Thinking in architectural design, and Collective Growth across our community."
            />
          </div>
        </div>
      </section>

      {/* 4. FOCUS AREAS (ICON ROW) */}
      <section className="py-12 md:py-20 px-6 border-b border-indigo/10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="03 / CORE DOMAINS" heading="Our Focus Areas" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
            {focusAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <ScrollReveal
                  key={idx}
                  delay={idx * 0.08}
                  className="group flex flex-col items-center justify-center border border-indigo/10 p-6 bg-paper/50 hover:bg-paper/80 hover:border-signal/30 transition-all duration-300 select-none hover:-translate-y-1 hover:shadow-sm rounded-2xl"
                >
                  <Icon strokeWidth={1.5} className="w-10 h-10 text-indigo/60 group-hover:text-signal transition-colors duration-300 mb-4" />
                  <span className="font-heading text-xs text-indigo font-bold text-center uppercase tracking-wider group-hover:text-indigo transition-colors font-medium">
                    {area.label}
                  </span>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHY JOIN DELTA */}
      <section className="py-12 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="04 / INVITATION" heading="Why Join DELTA?" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {whyJoinReasons.map((reason, idx) => (
              <Card
                key={idx}
                icon={reason.icon}
                title={reason.title}
                description={reason.description}
                iconPosition="top-right"
              />
            ))}

            {/* Call to action card */}
            <div className="group relative bg-signal border border-indigo/20 p-6 md:p-8 flex flex-col justify-between select-none rounded-3xl hover:border-indigo/40 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(14,48,97,0.3)] transition-all duration-300">
              <div>
                <h3 className="font-heading text-lg font-bold text-paper uppercase mb-4 tracking-wide group-hover:text-indigo transition-colors">
                  Shape the future
                </h3>
                <p className="font-body text-sm leading-relaxed text-paper/75 font-light">
                  Ready to deploy algorithms, build networks, and grow alongside fellow creators? Connect the dots with us today.
                </p>
              </div>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 font-heading text-xs font-bold text-indigo hover:text-paper transition-colors duration-300"
                >
                  APPLICATION FORM <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
