import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace shared {
        export interface StringView {
            result?: string;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.shared.StringView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const rawText = value.result ?? "";
  const displayText = rawText.trim();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    - If there's valid text, show it with truncation for long content.
  //    - If no text is provided, show a placeholder with an icon.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      {displayText ? (
        <p className="text-gray-800 text-base leading-relaxed line-clamp-3 break-words">
          {displayText}
        </p>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2 text-sm">No data available</span>
        </div>
      )}
    </div>
  );
}
