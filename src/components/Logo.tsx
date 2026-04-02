import React from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-bg-surface shadow-[0_0_15px_rgba(6,182,212,0.3)] border border-accent-cyan/30 group shrink-0">
        {/* SVG for circular text */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] opacity-80 group-hover:opacity-100 transition-opacity">
          <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
          <text className="text-[10.5px] font-bold uppercase tracking-[0.15em] fill-accent-cyan">
            <textPath href="#circlePath" startOffset="0%">
              TUFANGANJ IT EDUCATION CENTRE •
            </textPath>
          </text>
        </svg>
        {/* Center Text */}
        <div className="absolute inset-2 rounded-full border-2 border-accent-purple/40 flex items-center justify-center bg-bg-base/80 backdrop-blur-sm z-10">
          <span className="font-heading font-black text-lg bg-clip-text text-transparent bg-gradient-to-br from-accent-cyan to-accent-purple">
            TIEC
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center hidden sm:flex">
        <span className="font-heading font-bold text-xl tracking-wider text-white leading-none mb-1">
          TIEC
        </span>
        <span className="text-[8px] text-text-secondary uppercase tracking-[0.2em] font-medium leading-none">
          Tufanganj IT Education Centre
        </span>
      </div>
    </div>
  );
}
