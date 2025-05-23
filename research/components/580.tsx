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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Since AutoViewInputSubTypes.empty_object has no displayable properties,
  // we render a friendly "no data" placeholder.
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm">
      <LucideReact.AlertCircle
        size={48}
        className="mb-3 text-gray-300"
        aria-hidden="true"
      />
      <span className="text-gray-500 text-sm">No data available</span>
    </div>
  );
}
