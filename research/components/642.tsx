import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = string[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const items = value;
  const hasItems = items.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasItems) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" aria-hidden="true" />
        <span className="text-sm">No items available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full max-w-xs truncate"
        >
          <LucideReact.Tag
            size={14}
            className="mr-1 text-gray-500 flex-shrink-0"
            aria-hidden="true"
          />
          <span className="truncate">{item}</span>
        </div>
      ))}
    </div>
  );
}
