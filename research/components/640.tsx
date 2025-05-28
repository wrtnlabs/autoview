import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = string[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    - Deduplicate the array and prepare for display (max 5 items).
  const uniqueItems = [...new Set(value)];
  const maxDisplay = 5;
  const displayItems = uniqueItems.slice(0, maxDisplay);
  const remainingCount = uniqueItems.length - displayItems.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center mb-2 text-sm font-semibold text-gray-700">
        <LucideReact.Tag size={16} className="mr-1 text-gray-500" />
        <span>Items ({uniqueItems.length})</span>
      </div>

      {uniqueItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-gray-400">
          <LucideReact.AlertCircle
            size={24}
            aria-label="No data available"
          />
          <span className="mt-2 text-sm">No items available</span>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {displayItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full truncate"
              title={item}
            >
              {item}
            </li>
          ))}
          {remainingCount > 0 && (
            <li className="flex items-center bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
              +{remainingCount} more
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
