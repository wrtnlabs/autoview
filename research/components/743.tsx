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

// The component name is "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Determine if there is any data to display
  const hasData = value && Object.keys(value).length > 0;

  // If no properties are present, show a standardized "no data" placeholder
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-sm">No data available</span>
      </div>
    );
  }

  // If properties exist (in future extensions), render them in a simple key-value list
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <ul className="space-y-2">
        {Object.entries(value).map(([key, val]) => (
          <li key={key} className="flex justify-between">
            <span className="font-medium text-gray-700">{key}:</span>
            <span className="text-gray-900 truncate ml-4">{String(val)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
