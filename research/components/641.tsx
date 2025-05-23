import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = string[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Filter out any falsy strings, then sort alphabetically for consistent display.
  const items: string[] = Array.isArray(value) ? value.filter((s) => !!s) : [];
  const sortedItems = items.length > 0 ? [...items].sort((a, b) => a.localeCompare(b)) : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    - Empty state: show an alert icon with a message.
  //    - Non-empty: render each string as a badge with a tag icon.
  if (sortedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-sm">No items available</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {sortedItems.map((item, idx) => (
        <span
          key={idx}
          className="flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm max-w-xs truncate"
          title={item}
        >
          <LucideReact.Tag size={14} className="text-gray-400" />
          <span className="truncate">{item}</span>
        </span>
      ))}
    </div>
  );
}
