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
  // Determine if there's any meaningful data to show
  const hasData = Object.keys(value).length > 0;

  // Render fallback for empty data
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <LucideReact.AlertCircle size={48} className="text-gray-300" />
        <span className="mt-2 text-gray-500 text-sm">No data available</span>
      </div>
    );
  }

  // If data structure changes in the future, display raw JSON
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-auto">
      <pre className="text-xs text-gray-700 whitespace-pre-wrap">
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  );
}
