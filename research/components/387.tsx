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
  // we render a consistent empty state placeholder.
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md border border-gray-100 w-full h-full">
      <LucideReact.AlertCircle
        size={48}
        className="text-gray-300 mb-4"
        aria-label="No data available"
      />
      <p className="text-gray-500 text-center text-sm">
        No data to display.
      </p>
    </div>
  );
}
