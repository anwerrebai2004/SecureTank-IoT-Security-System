"use client";

import { useState, useEffect } from "react";

interface MiniChartProps {
  fuelHistory: number[];
  vanneHistory: number[];
  labels: string[];
}

export default function MiniChart({
  fuelHistory,
  vanneHistory,
  labels,
}: MiniChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative h-[140px] w-full bg-slate-800/50 rounded-lg flex items-center justify-center">
        <div className="text-xs text-slate-400 font-mono">Loading chart...</div>
      </div>
    );
  }

  const maxFuel = 100;
  const height = 140;
  const width = 100;

  const fuelPath = fuelHistory
    .map((f, i) => {
      const x = (i / (fuelHistory.length - 1)) * width;
      const y = height - (f / maxFuel) * height;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const fillPath = `${fuelPath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="relative h-[140px] w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((v) => (
          <line
            key={v}
            x1="0"
            y1={height - (v / 100) * height}
            x2={width}
            y2={height - (v / 100) * height}
            stroke="rgba(71,85,105,0.2)"
            strokeWidth="0.3"
          />
        ))}
        {/* Valve open periods */}
        {vanneHistory.map((v, i) =>
          v === 1 ? (
            <rect
              key={i}
              x={(i / (vanneHistory.length - 1)) * width - 1}
              y={0}
              width="2"
              height={height}
              fill="rgba(239,68,68,0.2)"
            />
          ) : null
        )}
        {/* Gradient fill */}
        <defs>
          <linearGradient id="fuelGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(34,197,94,0.3)" />
            <stop offset="100%" stopColor="rgba(34,197,94,0)" />
          </linearGradient>
        </defs>
        <path d={fillPath} fill="url(#fuelGradient)" />
        {/* Fuel line */}
        <path
          d={fuelPath}
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.5"
          style={{ filter: "drop-shadow(0 0 4px rgba(34,197,94,0.4))" }}
        />
      </svg>
      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] font-mono text-slate-500 px-1">
        {labels.filter((_, i) => i % 8 === 0).map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>
    </div>
  );
}