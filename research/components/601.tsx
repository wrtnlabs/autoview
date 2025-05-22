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
  // Since AutoViewInputSubTypes.empty_object has no properties, we render a placeholder state.

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <LucideReact.AlertCircle className="text-gray-400" size={32} />
      <span className="mt-3 text-gray-500 text-sm">No data available</span>
    </div>
  );
}
