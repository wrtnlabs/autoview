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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const hasData = Object.keys(value).length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-base font-medium">No data available</span>
      </div>
    );
  }

  // Fallback rendering for non-empty objects: pretty-print JSON
  return (
    <pre className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 overflow-x-auto">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}
