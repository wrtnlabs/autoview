import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export namespace IApiProjectsColumnsMoves {
    export type PostResponse = {};
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiProjectsColumnsMoves.PostResponse;

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Determine if the input object has any keys to display
  const hasData = value && Object.keys(value).length > 0;

  // 1. Empty state: no meaningful data to render
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle className="text-gray-400" size={48} />
        <span className="mt-2 text-sm">No data available</span>
      </div>
    );
  }

  // 2. Fallback: pretty-print any unexpected shape of data
  //    This ensures that if the API response expands in the future,
  //    the component will still render something useful.
  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-inner overflow-auto max-h-64">
      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  );
}
