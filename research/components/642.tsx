import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {}
export type AutoViewInput = string[];

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Prepare the list of items and limit how many we display
  const items = value ?? [];
  const MAX_DISPLAY = 10;
  const displayItems = items.slice(0, MAX_DISPLAY);
  const remainingCount = items.length - displayItems.length;

  // Render a badge-like list for string arrays, with a placeholder for empty state
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {items.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2 text-sm">No items available</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {displayItems.map((item, idx) => (
            <div
              key={`item-${idx}`}
              className="flex items-center bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded max-w-xs"
            >
              <LucideReact.Tag
                size={16}
                className="mr-1 text-gray-500 flex-shrink-0"
              />
              <span className="truncate">{item}</span>
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="flex items-center text-gray-500 text-sm px-2 py-1">
              +{remainingCount} more
            </div>
          )}
        </div>
      )}
    </div>
  );
}
