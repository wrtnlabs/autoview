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
  const names: string[] = Array.isArray(value.names) ? value.names : [];
  const totalCount: number = names.length;
  const maxDisplay: number = 8;
  const displayNames: string[] = names.slice(0, maxDisplay);
  const remainingCount: number = totalCount - displayNames.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Topic Names</h2>
        <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {totalCount}
        </span>
      </div>
      {totalCount === 0 ? (
        <p className="mt-2 text-sm text-gray-500">No names available.</p>
      ) : (
        <ul className="mt-3 flex flex-wrap gap-2">
          {displayNames.map((name, idx) => (
            <li key={idx}>
              <span className="inline-block max-w-xs truncate bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                {name}
              </span>
            </li>
          ))}
          {remainingCount > 0 && (
            <li>
              <span className="inline-block text-gray-600 text-sm px-3 py-1">
                +{remainingCount} more
              </span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
