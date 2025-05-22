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
  // Since AutoViewInput is an empty object by schema, we display a meaningful empty state.

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm">
      <LucideReact.AlertCircle className="text-gray-400 mb-3" size={48} />
      <p className="text-gray-600 text-lg font-medium">No data available</p>
    </div>
  );
}
