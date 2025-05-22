import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {}
export type AutoViewInput = string[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Here, we treat the string[] as a list of items (e.g., tags) and filter out empty entries.
  const items = Array.isArray(value)
    ? value.map((v) => v.trim()).filter((v) => v.length > 0)
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Show a placeholder if the list is empty; otherwise, display each item as a badge.
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No items available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-1 mb-3">
        <LucideReact.List size={16} className="text-gray-500" />
        <span className="text-gray-700 font-medium">Items</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="flex items-center bg-gray-100 text-gray-800 text-sm font-medium rounded-full px-3 py-1 truncate"
            title={item}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
