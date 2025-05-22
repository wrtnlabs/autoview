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
  const text = value.result?.trim() || "";
  const hasText = text.length > 0;
  const displayText = hasText ? text : "No data available";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow flex items-start gap-3">
      {hasText ? (
        <LucideReact.FileText
          className="text-gray-500 mt-1 flex-shrink-0"
          size={20}
        />
      ) : (
        <LucideReact.AlertCircle
          className="text-gray-400 flex-shrink-0"
          size={24}
        />
      )}
      <p
        className={
          hasText
            ? "text-gray-700 text-sm line-clamp-3 leading-relaxed"
            : "text-gray-400 text-sm italic"
        }
      >
        {displayText}
      </p>
    </div>
  );
}
