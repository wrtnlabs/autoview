import React from "react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = string[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const items = Array.isArray(value) ? value : [];
  const count = items.length;
  const truncate = (str: string, max: number): string =>
    str.length > max ? str.slice(0, max - 1) + '…' : str;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900">
        {count > 0 ? `Items (${count})` : 'No items to display'}
      </h3>
      {count > 0 && (
        <div className="flex flex-wrap mt-2">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full mr-2 mt-2 max-w-xs truncate"
              title={item}
            >
              {truncate(item, 24)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
