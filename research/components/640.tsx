import React from "react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = string[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const items: string[] = Array.isArray(value) ? value : [];
  const totalCount: number = items.length;
  const MAX_DISPLAY = 10;
  const hasOverflow: boolean = totalCount > MAX_DISPLAY;
  const visibleItems: string[] = hasOverflow ? items.slice(0, MAX_DISPLAY) : items;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="text-gray-700 font-medium text-sm mb-2">
        Items ({totalCount})
      </div>
      {totalCount === 0 ? (
        <div className="text-gray-500 text-sm">No items to display.</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {visibleItems.map((item, index) => (
            <span
              key={index}
              className="inline-block max-w-[150px] overflow-hidden whitespace-nowrap truncate px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full"
            >
              {item}
            </span>
          ))}
          {hasOverflow && (
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{totalCount - MAX_DISPLAY} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
