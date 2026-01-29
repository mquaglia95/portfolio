import React from 'react';
import './App.css';

export default function VortexBackground({ className = '' }) {
  // Simple SVG vortex background inspired by shadcn's vortex
  // Uses white icons/shapes and CSS rotations to create a subtle animated background
  return (
    <div className={`vortex-wrapper ${className}`} aria-hidden="true">
      <svg className="vortex-svg vortex-rotate-slow" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feBlend in="SourceGraphic" in2="b" mode="screen" />
          </filter>
        </defs>
        <g fill="#fff" opacity="0.12" filter="url(#soft)">
          <circle cx="400" cy="300" r="220" />
          <circle cx="400" cy="300" r="160" opacity="0.08" />
          <circle cx="400" cy="300" r="100" opacity="0.06" />
        </g>
        <g className="vortex-icons" fill="#fff" opacity="0.95">
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i / 18) * Math.PI * 2;
            const r = 220 - (i % 6) * 24;
            const x = 400 + Math.cos(angle) * r;
            const y = 300 + Math.sin(angle) * r * 0.9;
            const s = 6 + (i % 4) * 2;
            return <circle key={i} cx={x} cy={y} r={s} />;
          })}
        </g>
      </svg>

      <svg className="vortex-svg vortex-rotate-fast" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <g className="vortex-icons" fill="#fff" opacity="0.06">
          {Array.from({ length: 28 }).map((_, i) => {
            const angle = (i / 28) * Math.PI * 2 + 0.4;
            const r = 120 + (i % 7) * 18;
            const x = 400 + Math.cos(angle) * r;
            const y = 300 + Math.sin(angle) * r * 0.85;
            const s = 3 + (i % 3) * 1.5;
            return <circle key={i} cx={x} cy={y} r={s} />;
          })}
        </g>
      </svg>
    </div>
  );
}
