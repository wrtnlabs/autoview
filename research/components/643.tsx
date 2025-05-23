import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = string[];



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Filter out any empty or whitespace-only strings
  const items = Array.isArray(value) ? value.filter(item => item.trim() !== "") : [];

  // 2. Empty state display
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={24} className="text-gray-400 mb-2" aria-label="No items" />
        <span className="text-sm">No items available</span>
      </div>
    );
  }

  // 3. Display each string as a badge with an icon
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {items.map((item, idx) => (
        <span
          key={idx}
          className="flex items-center space-x-1 bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full max-w-xs truncate"
          title={item}
        >
          <LucideReact.Tag size={16} className="text-gray-500 flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{item}</span>
        </span>
      ))}
    </div>
  );
}
