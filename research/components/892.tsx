import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * A topic aggregates entities that are related to a subject.
   *
   * @title Topic
   */
  export type topic = {
    names: string[];
  };
}
export type AutoViewInput = AutoViewInputSubTypes.topic;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const names = value.names ?? [];
  const totalCount = names.length;
  const maxVisible = 5;
  const visibleNames = names.slice(0, maxVisible);
  const extraCount = totalCount > maxVisible ? totalCount - maxVisible : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm text-gray-500">
        <LucideReact.AlertCircle
          size={24}
          aria-label="No names available"
          className="mb-2"
        />
        <span className="text-sm">No names available</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center mb-3">
        <LucideReact.Tag size={20} className="text-gray-600" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Topic <span className="text-gray-500">({totalCount})</span>
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {visibleNames.map((name, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full truncate max-w-xs"
          >
            {name}
          </span>
        ))}
        {extraCount > 0 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
            +{extraCount} more
          </span>
        )}
      </div>
    </div>
  );
}
