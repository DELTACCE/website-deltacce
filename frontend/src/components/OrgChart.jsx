import React from 'react';

export default function OrgChart() {
  return (
    <div className="relative font-heading border border-indigo/10 p-8 md:p-12 bg-paper/30 select-none overflow-hidden rounded-3xl">
      {/* Blueprint background grid ticks */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-[20%] left-[10%]">+</div>
        <div className="absolute bottom-[20%] right-[10%]">+</div>
        <div className="absolute top-[50%] left-[45%]">GRID_NODE</div>
      </div>

      <h3 className="text-xs text-teal font-bold uppercase tracking-[0.2em] mb-10 text-center">
        {"// HIERARCHICAL TOPOLOGY"}
      </h3>

      <div className="flex flex-col items-center gap-4 max-w-3xl mx-auto text-center">
        
        {/* Level 1: Faculty Coordinator */}
        <div className="relative z-10 border border-indigo/25 bg-paper px-6 py-3 min-w-[220px] shadow-sm rounded-2xl">
          <span className="text-[9px] text-teal font-bold uppercase tracking-wider block mb-0.5">Level 01</span>
          <span className="text-xs md:text-sm font-bold text-indigo uppercase">Faculty Coordinator</span>
        </div>

        {/* Connecting Line L1 -> L2 */}
        <div className="w-[1px] h-8 bg-indigo/20 relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-signal rounded-full"></div>
        </div>

        {/* Level 2: Core Committee */}
        <div className="relative z-10 border border-indigo/25 bg-paper px-6 py-3 min-w-[220px] shadow-sm rounded-2xl">
          <span className="text-[9px] text-teal font-bold uppercase tracking-wider block mb-0.5">Level 02</span>
          <span className="text-xs md:text-sm font-bold text-indigo uppercase">Executive Core Committee</span>
        </div>

        {/* Connecting Line L2 -> L3 */}
        <div className="w-[1px] h-6 bg-indigo/20 relative"></div>
        <div className="w-full max-w-xl h-[1px] bg-indigo/20 relative">
          {/* Horizontal expansion bar */}
        </div>
        
        {/* Level 3: Departments Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-4">
          
          {/* Tech */}
          <div className="border border-indigo/15 bg-paper/50 py-3 px-4 flex flex-col justify-center relative rounded-xl">
            <div className="absolute -top-[17px] left-1/2 -translate-x-1/2 w-[1px] h-[17px] bg-indigo/20"></div>
            <span className="text-[8px] text-teal font-bold tracking-wider uppercase block mb-0.5">Dept A</span>
            <span className="text-xs font-bold text-indigo uppercase">Technical Team</span>
          </div>

          {/* Media */}
          <div className="border border-indigo/15 bg-paper/50 py-3 px-4 flex flex-col justify-center relative rounded-xl">
            <div className="absolute -top-[17px] left-1/2 -translate-x-1/2 w-[1px] h-[17px] bg-indigo/20"></div>
            <span className="text-[8px] text-teal font-bold tracking-wider uppercase block mb-0.5">Dept B</span>
            <span className="text-xs font-bold text-indigo uppercase">Media Leads</span>
          </div>

          {/* Content */}
          <div className="border border-indigo/15 bg-paper/50 py-3 px-4 flex flex-col justify-center relative rounded-xl">
            <div className="absolute -top-[17px] left-1/2 -translate-x-1/2 w-[1px] h-[17px] bg-indigo/20"></div>
            <span className="text-[8px] text-teal font-bold tracking-wider uppercase block mb-0.5">Dept C</span>
            <span className="text-xs font-bold text-indigo uppercase">Content Writers</span>
          </div>

          {/* Events */}
          <div className="border border-indigo/15 bg-paper/50 py-3 px-4 flex flex-col justify-center relative rounded-xl">
            <div className="absolute -top-[17px] left-1/2 -translate-x-1/2 w-[1px] h-[17px] bg-indigo/20"></div>
            <span className="text-[8px] text-teal font-bold tracking-wider uppercase block mb-0.5">Dept D</span>
            <span className="text-xs font-bold text-indigo uppercase">Event Coord.</span>
          </div>

        </div>

        {/* Connecting departments to network */}
        <div className="w-full max-w-xl h-[1px] bg-indigo/10 mt-4"></div>
        <div className="w-[1px] h-6 bg-indigo/10 relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-teal rounded-full"></div>
        </div>

        {/* Level 4: Members Network */}
        <div className="border border-dashed border-indigo/30 bg-paper/10 px-8 py-3 rounded-2xl">
          <span className="text-[9px] text-teal font-bold uppercase tracking-wider block mb-0.5">Level 04</span>
          <span className="text-xs md:text-sm font-bold text-indigo uppercase">DELTA Member Base</span>
        </div>

      </div>
    </div>
  );
}
