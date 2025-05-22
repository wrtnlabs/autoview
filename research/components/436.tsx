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
  // Since AutoViewInput is an empty object, we display an empty-state placeholder.
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
      <LucideReact.AlertCircle
        size={24}
        className="text-gray-400 mb-2"
        aria-hidden="true"
      />
      <span className="text-sm font-medium">No data available</span>
    </div>
  );
}
