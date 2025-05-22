import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export namespace shared {
    export type StringView = {
      result?: string;
    };
  }
}
export type AutoViewInput = AutoViewInputSubTypes.shared.StringView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const rawText = value.result ?? "";
  const displayText = rawText.trim();
  const hasText = displayText.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasText) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow-sm flex flex-col items-center text-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="text-gray-400" />
        <span className="mt-2">No data available</span>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <LucideReact.FileText size={20} className="text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-800">Result</h2>
      </div>
      <p className="mt-2 text-gray-700 whitespace-pre-wrap break-words line-clamp-5">
        {displayText}
      </p>
    </div>
  );
}
