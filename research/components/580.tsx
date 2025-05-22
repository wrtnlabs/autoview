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
  // Since AutoViewInputSubTypes.empty_object contains no properties,
  // we render a placeholder indicating that no data is available.

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-sm text-gray-500">
      <LucideReact.AlertCircle size={48} className="mb-2" />
      <span className="text-sm">No data available</span>
    </div>
  );
}
