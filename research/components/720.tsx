import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * An object without any properties.
   *
   * @title Empty Object
   */
  export type empty_object = {};
}
export type AutoViewInput = AutoViewInputSubTypes.empty_object;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Determine if there's any data to display
  const hasProperties = Object.keys(value).length > 0;

  // 2. Render placeholder for empty or missing data
  if (!hasProperties) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm">
        <LucideReact.AlertCircle size={48} className="mb-2 text-gray-400" />
        <p className="text-sm text-gray-500">No data available.</p>
      </div>
    );
  }

  // 3. Generic rendering for any future properties on the object
  return (
    <dl className="grid grid-cols-1 gap-4 p-4 bg-white rounded-lg shadow-sm">
      {Object.entries(value).map(([key, val]) => (
        <div key={key} className="flex justify-between">
          <dt className="text-gray-600 font-medium">{key}</dt>
          <dd className="text-gray-800 truncate">{String(val)}</dd>
        </div>
      ))}
    </dl>
  );
}
