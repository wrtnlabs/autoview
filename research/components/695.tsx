import * as LucideReact from "lucide-react";
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

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Determine whether there is any data to display
  const hasData = value && Object.keys(value).length > 0;

  // 2. If no properties exist, render a placeholder for empty state
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <LucideReact.AlertCircle size={48} className="text-gray-400 mb-2" />
        <span className="text-gray-500 text-base">No data available</span>
      </div>
    );
  }

  // 3. Fallback rendering: pretty-print any unexpected data
  return (
    <pre className="p-4 overflow-auto text-sm text-gray-700 bg-gray-50 rounded-lg">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}
