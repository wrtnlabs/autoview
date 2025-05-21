import React from "react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = string[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalItems = value.length;
  const maxDisplay = 10;
  const displayItems = totalItems > maxDisplay ? value.slice(0, maxDisplay) : value;
  const remainingCount = totalItems - displayItems.length;

  // Utility to truncate long strings with an ellipsis
  const truncate = (text: string, limit: number = 20): string =>
    text.length > limit ? `${text.slice(0, limit)}…` : text;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section aria-label="String List" className="p-4 bg-white rounded-lg shadow-md">
      <header className="flex items-center mb-3">
        <h2 className="text-base font-semibold text-gray-900">Items</h2>
        <span className="ml-2 text-sm text-gray-500">({totalItems})</span>
      </header>
      <ul role="list" className="flex flex-wrap">
        {displayItems.map((item, idx) => (
          <li key={idx} className="mr-2 mb-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded truncate max-w-[120px]">
              {truncate(item)}
            </span>
          </li>
        ))}
        {remainingCount > 0 && (
          <li>
            <span className="inline-block bg-gray-100 text-gray-500 text-sm font-medium px-2.5 py-0.5 rounded">
              +{remainingCount} more
            </span>
          </li>
        )}
      </ul>
    </section>
  );
}
