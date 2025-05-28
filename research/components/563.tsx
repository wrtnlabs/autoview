import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiProjectsColumnsMoves {
        export interface PostResponse {
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiProjectsColumnsMoves.PostResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Determine if the input object has any keys to display
  const hasData = value && Object.keys(value).length > 0;

  // If there's no meaningful data, render an empty state placeholder
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-sm">No data available</span>
      </div>
    );
  }

  // Fallback: Render the raw JSON in a code block for any unexpected data
  return (
    <pre className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 overflow-auto">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}
