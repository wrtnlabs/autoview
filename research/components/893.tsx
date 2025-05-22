import LucideReact from "lucide-react";
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
  const names = Array.isArray(value.names) ? value.names : [];
  const totalCount = names.length;
  const maxDisplay = 10;
  const displayNames = names.slice(0, maxDisplay);
  const extraCount = totalCount - displayNames.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mb-3">
        <LucideReact.Users
          size={20}
          className="text-gray-500 mr-2"
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-800">Topic Entities</h2>
        <span className="ml-auto text-sm text-gray-500">
          {totalCount} {totalCount === 1 ? "item" : "items"}
        </span>
      </div>

      {totalCount > 0 ? (
        <div className="flex flex-wrap gap-2">
          {displayNames.map((name, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full truncate"
            >
              {name}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm font-medium rounded-full">
              +{extraCount} more
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center text-gray-400">
          <LucideReact.AlertCircle
            size={24}
            className="mr-2"
            aria-hidden="true"
          />
          <span className="text-sm">No entities available</span>
        </div>
      )}
    </div>
  );
}
