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
  const text = value.result?.trim() ?? "";
  const hasContent = text.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    - If there's content, display it with clamped lines and a tooltip for full view.
  //    - Otherwise, show a placeholder icon and message.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {hasContent ? (
        <p
          className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap break-words line-clamp-3"
          title={text}
        >
          {text}
        </p>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-gray-400">
          <LucideReact.AlertCircle size={24} className="mb-2" />
          <span className="text-sm">No data available</span>
        </div>
      )}
    </div>
  );
}
