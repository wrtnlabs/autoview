import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {}
export type AutoViewInput = number;

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants: format the number with locale-aware thousands separators and up to 2 decimal places.
  const formattedValue = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
  }).format(value);

  // 2. Visual structure: a clean card with a subtle icon and the formatted number, centered and responsive.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center w-full max-w-xs mx-auto">
      <LucideReact.Hash
        size={32}
        className="text-gray-400 mb-2"
        aria-hidden="true"
      />
      <span className="text-2xl font-semibold text-gray-900">
        {formattedValue}
      </span>
    </div>
  );
}
