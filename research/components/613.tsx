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

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Since AutoViewInput is an empty object, there's no data to display.
  // Render a friendly placeholder indicating the absence of data.

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow border border-gray-200">
      <LucideReact.AlertCircle
        size={48}
        className="text-gray-400 mb-3"
        aria-label="No data available"
      />
      <span className="text-gray-500 text-sm">No data available</span>
    </div>
  );
}
