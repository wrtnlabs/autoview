import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {}
export type AutoViewInput = string[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const items = Array.isArray(value) ? value : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Show an empty state when there are no strings to display.
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
        <LucideReact.AlertCircle
          size={24}
          className="text-gray-400"
          aria-label="No items"
        />
        <span className="mt-2 text-gray-500 text-sm">No items available</span>
      </div>
    );
  }

  //    Display each string as a tag/pill with an icon.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="flex items-center bg-gray-100 text-gray-700 text-sm font-medium px-2 py-1 rounded"
          >
            <LucideReact.Tag size={12} className="mr-1 text-gray-500" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
