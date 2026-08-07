import React from 'react';
import SectionHeading from '../components/SectionHeading';
import TeamCard from '../components/TeamCard';
import OrgChart from '../components/OrgChart';
import { committeeData } from '../data/committee';

export default function Committee() {
  const { faculty, core, technical, media, content, events } = committeeData;

  return (
    <div className="bg-paper px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <section className="min-h-[60vh] md:min-h-[110vh] flex flex-col justify-center border-b border-indigo/10 pt-10 pb-16 md:pb-20 mb-14 md:mb-24">
          <span className="font-heading text-xs text-signal font-bold tracking-[0.25em] uppercase block mb-4">
            {"// TEAM NETWORK"}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-indigo uppercase leading-none tracking-tight mb-6 animate-fade-in">
            Led by a vision,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo to-teal">Driven by data.</span>
          </h1>
          <p className="font-body text-base md:text-lg text-ink/80 max-w-2xl leading-relaxed">
            Meet the researchers, creators, developers, and administrators steering the Data Oriented Thinkers' Association at Christ College of Engineering.
          </p>
        </section>

        {/* 1. Faculty Coordinator Section */}
        <section className="mb-14 md:mb-24">
          <SectionHeading eyebrow="01 / ADVISOR" heading="Faculty Lead" />
          <div className="max-w-3xl mt-10">
            <TeamCard member={faculty} featured={true} />
          </div>
        </section>

        {/* 2. Core Executive Board */}
        <section className="mb-14 md:mb-24">
          <SectionHeading eyebrow="02 / EXECUTIVE" heading="Core Committee" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {core.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* 3. Team Structure Topology (Org Chart) */}
        <section className="mb-14 md:mb-24">
          <SectionHeading eyebrow="03 / TOPOLOGY" heading="Team Hierarchy" />
          <div className="mt-10">
            <OrgChart />
          </div>
        </section>

        {/* 4. Leads & Coordinators Grids */}
        <section className="mb-14 md:mb-24">
          <SectionHeading eyebrow="04 / DEPARTMENTS" heading="Leads & Coordinators" />

          <div className="space-y-16 mt-12">

            {/* Technical Leads */}
            <div>
              <h3 className="font-heading text-lg font-bold text-indigo uppercase border-b border-indigo/10 pb-2 mb-8 tracking-wider">
                Technical Leads
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {technical.map((member) => (
                  <div
                    key={member.id}
                    className="w-full sm:w-[calc(50%-0.75rem)] xl:w-[calc(25%-1.125rem)] max-w-[20rem] flex-none"
                  >
                    <TeamCard member={member} />
                  </div>
                ))}
              </div>
            </div>
                
            {/* Media Leads */}
            <div>
              <h3 className="font-heading text-lg font-bold text-indigo uppercase border-b border-indigo/10 pb-2 mb-8 tracking-wider">
                Media Leads
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {media.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>

            {/* Content Writers */}
            <div>
              <h3 className="font-heading text-lg font-bold text-indigo uppercase border-b border-indigo/10 pb-2 mb-8 tracking-wider">
                Content Writer Leads
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>

            {/* Event Coordinators */}
            <div>
              <h3 className="font-heading text-lg font-bold text-indigo uppercase border-b border-indigo/10 pb-2 mb-8 tracking-wider">
                Event Coordinators
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
