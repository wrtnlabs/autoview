import React from "react";
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
  const trimmedText = rawText.trim();
  const hasText = trimmedText.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      {hasText ? (
        <p className="text-gray-800 text-base leading-relaxed overflow-hidden line-clamp-3">
          {trimmedText}
        </p>
      ) : (
        <p className="text-gray-500 italic text-base">
          No result available.
        </p>
      )}
    </div>
  );
}
