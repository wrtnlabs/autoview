import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = number;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Here we format the raw number into a human-readable abbreviated string (e.g., 1.2K, 3.4M).
  const abbreviateNumber = (num: number): string => {
    if (isNaN(num)) return '-';
    const abs = Math.abs(num);
    if (abs >= 1e9) {
      return `${(num / 1e9).toFixed(1).replace(/\.0$/, '')}B`;
    }
    if (abs >= 1e6) {
      return `${(num / 1e6).toFixed(1).replace(/\.0$/, '')}M`;
    }
    if (abs >= 1e3) {
      return `${(num / 1e3).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return num.toString();
  };
  const formattedValue = abbreviateNumber(value);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    A simple stat card layout with an icon and the formatted value.
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm max-w-xs">
      <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
        <LucideReact.BarChart className="text-blue-500" size={24} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div className="ml-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Value</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{formattedValue}</p>
      </div>
    </div>
  );
}
