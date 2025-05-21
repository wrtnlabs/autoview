import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiProjectsColumnsCardsMoves {
        export type PostResponse = {};
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiProjectsColumnsCardsMoves.PostResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const entries = Object.entries(value);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (entries.length === 0) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm text-center text-gray-500">
        No data available.
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <dl className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
      {entries.map(([key, val]) => (
        <div key={key} className="flex justify-between">
          <dt className="text-gray-700 font-medium capitalize">
            {key
              .replace(/([A-Z])/g, ' $1')
              .replace(/[_-]/g, ' ')
              .trim()}
          </dt>
          <dd className="text-gray-900 truncate">
            {typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean'
              ? String(val)
              : JSON.stringify(val)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
