/**
 * LoadingSpinner Component
 * A classic film reel spinner matching the traditional cinema design.
 * @param size - Diameter of spinner in pixels
 * @param color - Color of the loading text (reel is always white/black)
 */
import React from "react";

interface LoadingSpinnerProps {
  /** Diameter in pixels */
  size?: number;
  /** Hex or CSS color for text */
  color?: string;
}

export function LoadingSpinner({ size = 48, color = "#10b981" }: LoadingSpinnerProps) {
  const radius = size / 2;
  const centerHoleRadius = size * 0.12;
  const outerHoleRadius = size * 0.08;
  const holeRingRadius = size * 0.32;

  // Create 7 holes around the center hole (classic film reel pattern)
  const holes = Array.from({ length: 7 }).map((_, i) => {
    const angle = (2 * Math.PI * i) / 7;
    const x = radius + holeRingRadius * Math.cos(angle);
    const y = radius + holeRingRadius * Math.sin(angle);
    return <circle key={i} cx={x} cy={y} r={outerHoleRadius} fill="black" />;
  });

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Film reel */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="animate-spin"
          style={{ animationDuration: "3s" }}
        >
          {/* Outer border ring */}
          <circle cx={radius} cy={radius} r={radius - 2} stroke="black" strokeWidth="4" fill="white" />

          {/* Inner border ring */}
          <circle cx={radius} cy={radius} r={radius - 6} stroke="black" strokeWidth="2" fill="none" />

          {/* Center hole */}
          <circle cx={radius} cy={radius} r={centerHoleRadius} fill="black" />

          {/* Surrounding holes */}
          {holes}
        </svg>
      </div>

      {/* Movie-themed loading text */}
      <div className="mt-4 flex items-center space-x-2">
        <div className="flex space-x-1">
          <span className="h-1 w-1 animate-pulse rounded-full bg-current" style={{ color }} />
          <span className="h-1 w-1 animate-pulse rounded-full bg-current" style={{ color, animationDelay: "0.2s" }} />
          <span className="h-1 w-1 animate-pulse rounded-full bg-current" style={{ color, animationDelay: "0.4s" }} />
        </div>
        <span className="text-sm font-medium" style={{ color }}>
          Loading Cinema...
        </span>
      </div>
    </div>
  );
}
