import LucideReact from "lucide-react";
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
  const content = value.result?.trim() ?? "";
  const hasContent = content.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    If there's no string to display, show a placeholder state.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      {hasContent ? (
        <p className="text-gray-800 text-base whitespace-pre-wrap break-words">
          {content}
        </p>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={24} />
          <p className="mt-2 text-sm">No data available</p>
        </div>
      )}
    </div>
  );
}
