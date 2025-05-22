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
  // Determine if the incoming object has any properties
  const hasData = value && Object.keys(value).length > 0;

  // Render a friendly empty state when there's no data to display
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
        <LucideReact.AlertCircle
          className="text-gray-400 mb-3"
          size={48}
          aria-label="No data available"
        />
        <span className="text-gray-600 text-lg font-medium">
          No data available
        </span>
      </div>
    );
  }

  // Schema has no defined properties—nothing else to render
  return null;
}
