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
  // Determine if the incoming object has any properties
  const hasData = Object.keys(value).length > 0;

  // 1. If there's no data, show a friendly empty state
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg text-gray-500">
        <LucideReact.AlertCircle
          size={48}
          className="text-gray-300 mb-4"
          aria-label="No data available"
        />
        <span className="text-lg font-medium">No data available</span>
      </div>
    );
  }

  // 2. Fallback: render the raw JSON in a scrollable code block for any unexpected properties
  return (
    <pre className="overflow-auto p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}
