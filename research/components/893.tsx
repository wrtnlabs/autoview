import React from "react";
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
  const { names } = value;
  // Sort names alphabetically for consistent display
  const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
  // Determine how many badges to show before collapsing
  const MAX_VISIBLE = 5;
  const visibleNames = sortedNames.slice(0, MAX_VISIBLE);
  const remainingCount = sortedNames.length - visibleNames.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Semantic HTML with responsive, mobile-first styling.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <header className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Topic Overview</h2>
        <span className="text-sm text-gray-500">
          {sortedNames.length} {sortedNames.length === 1 ? 'Name' : 'Names'}
        </span>
      </header>
      <div className="flex flex-wrap gap-2">
        {visibleNames.map((name, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full truncate max-w-xs"
          >
            {name}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
            +{remainingCount} more
          </span>
        )}
      </div>
    </div>
  );
}
