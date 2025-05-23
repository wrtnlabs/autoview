import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * An object without any properties.
     *
     * @title Empty Object
    */
    export interface empty_object {
    }
}
export type AutoViewInput = AutoViewInputSubTypes.empty_object;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Since AutoViewInputSubTypes.empty_object has no properties,
  // we render an informative empty state.
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm">
      <LucideReact.AlertCircle size={48} className="text-gray-300" />
      <span className="mt-3 text-gray-500 text-sm">
        No data available
      </span>
    </div>
  );
}
