import React from 'react';

export default function OrgChart() {
  return (
    <div className="relative font-heading border border-indigo/15 p-6 md:p-10 bg-paper/40 select-none overflow-hidden rounded-3xl">
      {/* Subtle brand mark in corner */}
      <div className="absolute top-4 left-6 text-signal font-heading text-lg font-bold">δ</div>

      <h3 className="text-xs text-teal font-bold uppercase tracking-[0.25em] mb-8 text-center">
        {"// HIERARCHICAL TOPOLOGY"}
      </h3>

      <div className="flex flex-col items-center max-w-3xl mx-auto text-center">

        {/* Level 1: Faculty Coordinator */}
        <div className="relative z-10 border border-indigo/30 bg-paper px-6 py-3 min-w-[220px] shadow-sm rounded-2xl">
          <span className="text-[9px] text-teal font-bold uppercase tracking-wider block mb-0.5">Level 01</span>
          <span className="text-xs md:text-sm font-extrabold text-indigo uppercase">Faculty Leadership</span>
        </div>

        {/* Vertical Line 1: L1 -> L2 */}
        <div className="flex flex-col items-center">
          <div className="w-[2px] h-6 bg-gradient-to-b from-indigo/30 to-signal"></div>
          <div className="w-2.5 h-2.5 bg-signal rounded-full -my-0.5 border-2 border-paper z-10"></div>
          <div className="w-[2px] h-6 bg-gradient-to-b from-signal to-indigo/30"></div>
        </div>

        {/* Level 2: Executive Core Committee */}
        <div className="relative z-10 border border-indigo/30 bg-paper px-6 py-3 min-w-[220px] shadow-sm rounded-2xl">
          <span className="text-[9px] text-teal font-bold uppercase tracking-wider block mb-0.5">Level 02</span>
          <span className="text-xs md:text-sm font-extrabold text-indigo uppercase">Executive Core Committee</span>
        </div>

        {/* Stem down to Department Horizontal Bar */}
        <div className="w-[2px] h-6 bg-indigo/30"></div>

        {/* Level 3: Department Tree */}
        <div className="w-full relative">
          {/* Top Horizontal Bar connecting L2 stem to 4 Department Columns */}
          <div className="hidden md:block w-[75%] mx-auto h-[2px] bg-indigo/30"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-4 md:pt-0">

            {/* Dept A */}
            <div className="flex flex-col items-center">
              <div className="hidden md:block w-[2px] h-5 bg-indigo/30"></div>
              <div className="w-full border border-indigo/15 bg-paper/80 py-3 px-3 rounded-xl shadow-xs">
                <span className="text-[8px] text-teal font-bold tracking-wider uppercase block mb-0.5">Dept A</span>
                <span className="text-xs font-bold text-indigo uppercase">Technical Team</span>
              </div>
              <div className="hidden md:block w-[2px] h-5 bg-indigo/20"></div>
            </div>

            {/* Dept B */}
            <div className="flex flex-col items-center">
              <div className="hidden md:block w-[2px] h-5 bg-indigo/30"></div>
              <div className="w-full border border-indigo/15 bg-paper/80 py-3 px-3 rounded-xl shadow-xs">
                <span className="text-[8px] text-teal font-bold tracking-wider uppercase block mb-0.5">Dept B</span>
                <span className="text-xs font-bold text-indigo uppercase">Media Leads</span>
              </div>
              <div className="hidden md:block w-[2px] h-5 bg-indigo/20"></div>
            </div>

            {/* Dept C */}
            <div className="flex flex-col items-center">
              <div className="hidden md:block w-[2px] h-5 bg-indigo/30"></div>
              <div className="w-full border border-indigo/15 bg-paper/80 py-3 px-3 rounded-xl shadow-xs">
                <span className="text-[8px] text-teal font-bold tracking-wider uppercase block mb-0.5">Dept C</span>
                <span className="text-xs font-bold text-indigo uppercase">Content Writers</span>
              </div>
              <div className="hidden md:block w-[2px] h-5 bg-indigo/20"></div>
            </div>

            {/* Dept D */}
            <div className="flex flex-col items-center">
              <div className="hidden md:block w-[2px] h-5 bg-indigo/30"></div>
              <div className="w-full border border-indigo/15 bg-paper/80 py-3 px-3 rounded-xl shadow-xs">
                <span className="text-[8px] text-teal font-bold tracking-wider uppercase block mb-0.5">Dept D</span>
                <span className="text-xs font-bold text-indigo uppercase">Event Coord.</span>
              </div>
              <div className="hidden md:block w-[2px] h-5 bg-indigo/20"></div>
            </div>

          </div>

          {/* Bottom Horizontal Bar connecting 4 Department Columns to L4 stem */}
          <div className="hidden md:block w-[75%] mx-auto h-[2px] bg-indigo/20"></div>
        </div>

        {/* Stem down to L4 */}
        <div className="flex flex-col items-center">
          <div className="w-[2px] h-5 bg-gradient-to-b from-indigo/20 to-teal"></div>
          <div className="w-2 h-2 bg-teal rounded-full -my-0.5 border border-paper z-10"></div>
          <div className="w-[2px] h-5 bg-gradient-to-b from-teal to-indigo/20"></div>
        </div>

        {/* Level 4: Members Network */}
        <div className="border border-dashed border-indigo/30 bg-paper/40 px-8 py-3 rounded-2xl shadow-xs">
          <span className="text-[9px] text-teal font-bold uppercase tracking-wider block mb-0.5">Level 04</span>
          <span className="text-xs md:text-sm font-extrabold text-indigo uppercase">DELTA Member Base</span>
        </div>

      </div>
    </div>
  );
}
