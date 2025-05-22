import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {}
export type AutoViewInput = string;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const rawText = typeof value === "string" ? value : String(value);
  const text = rawText.trim();
  const isEmpty = text.length === 0;

  // Truncate long text for mobile-first layout
  const MAX_PREVIEW_LENGTH = 200;
  const isLong = text.length > MAX_PREVIEW_LENGTH;
  const previewText = isLong ? `${text.slice(0, MAX_PREVIEW_LENGTH)}…` : text;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-sm">
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span className="text-sm">No data available</span>
        </div>
      ) : (
        <p className="text-gray-800 text-base leading-relaxed break-words line-clamp-3">
          {previewText}
        </p>
      )}
      {isLong && !isEmpty && (
        <p className="mt-2 text-sm text-gray-500 italic">Content truncated</p>
      )}
    </div>
  );
}
