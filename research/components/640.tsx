import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {}
export type AutoViewInput = string[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Here, treat the array of strings as tags or items, deduplicate and sort them.
  const uniqueTags = Array.from(
    new Set(value.filter((v) => typeof v === "string" && v.trim() !== "")),
  );
  const sortedTags = uniqueTags.sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
  const tagCount = sortedTags.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Display a header with an icon and count, then show tags or an empty state.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-gray-800">
          <LucideReact.Tag
            size={20}
            className="text-blue-500 mr-2"
            aria-hidden="true"
          />
          <h2 className="text-lg font-medium">Items</h2>
        </div>
        <span className="text-sm text-gray-500">
          {tagCount} {tagCount === 1 ? "item" : "items"}
        </span>
      </div>

      {tagCount > 0 ? (
        <div className="flex flex-wrap gap-2">
          {sortedTags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-full truncate max-w-xs"
              title={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-gray-400">
          <LucideReact.AlertCircle size={24} aria-hidden="true" />
          <span className="mt-2 text-sm">No items to display</span>
        </div>
      )}
    </div>
  );
}
