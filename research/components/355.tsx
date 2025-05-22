import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {}
export type AutoViewInput = string[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const items = value ?? [];
  const count = items.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {count > 0 ? (
        <>
          {/* Header with count */}
          <div className="flex items-center text-gray-700">
            <LucideReact.Tag size={16} className="mr-2 text-gray-500" />
            <span className="font-medium">Items ({count})</span>
          </div>
          {/* Badge list */}
          <div className="flex flex-wrap gap-2 mt-2">
            {items.map((item, idx) => (
              <span
                key={idx}
                className="flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                <LucideReact.Tag size={12} className="mr-1 text-blue-500" />
                {item}
              </span>
            ))}
          </div>
        </>
      ) : (
        // Empty state
        <div className="flex flex-col items-center justify-center text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2 text-sm">No data available</span>
        </div>
      )}
    </div>
  );
}
