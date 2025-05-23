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
  // 1. Data preparation
  const text = value.result ?? "";
  const hasText = text.trim().length > 0;

  // 2. Compose the visual structure
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm max-w-full">
      {hasText ? (
        <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap break-words line-clamp-3">
          {text}
        </p>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <LucideReact.AlertCircle
            size={24}
            className="text-gray-400"
            aria-label="No data available"
          />
          <span className="mt-2 text-sm">No data available</span>
        </div>
      )}
    </div>
  );
}
