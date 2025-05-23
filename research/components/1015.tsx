import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes { }
export type AutoViewInput = string;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Truncate very long text for better mobile presentation
  const maxLength = 200;
  const isLong = typeof value === "string" && value.length > maxLength;
  const displayText = isLong
    ? value.slice(0, maxLength).trimEnd() + "…"
    : value;

  // Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mb-2">
        <LucideReact.FileText
          size={20}
          className="text-gray-400"
          aria-hidden="true"
        />
        <span className="ml-2 text-gray-700 font-medium">Content</span>
      </div>
      <p className="text-gray-800 text-sm whitespace-pre-wrap break-words leading-relaxed line-clamp-3">
        {displayText}
      </p>
    </div>
  );
}
