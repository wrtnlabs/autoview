import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Color-coded labels help you categorize and filter your issues (just like labels in Gmail).
   *
   * @title Label
   */
  export type label = {
    /**
     * Unique identifier for the label.
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * URL for the label
     */
    url: string;
    /**
     * The name of the label.
     */
    name: string;
    /**
     * Optional description of the label, such as its purpose.
     */
    description: string | null;
    /**
     * 6-character hex code, without the leading #, identifying the color
     */
    color: string;
    /**
     * Whether this label comes by default in a new repository.
     */
    default: boolean;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.label[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data normalization
  const labels = Array.isArray(value) ? value : [];

  // 2. Empty state
  if (labels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <LucideReact.AlertCircle
          size={48}
          className="text-gray-400"
          aria-hidden="true"
        />
        <span className="mt-4 text-gray-500">No labels available</span>
      </div>
    );
  }

  // 3. Compose visual structure
  return (
    <div className="flex flex-wrap gap-4">
      {labels.map((label) => (
        <div
          key={label.id}
          className="flex flex-col bg-white border border-gray-200 rounded-lg p-4 shadow-sm w-full sm:w-auto"
        >
          <div className="flex items-center gap-2">
            {/* Color indicator */}
            <span
              className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0"
              style={{ backgroundColor: `#${label.color}` }}
            />
            {/* Label name */}
            <span className="text-sm font-semibold text-gray-800 truncate">
              {label.name}
            </span>
            {/* Default indicator */}
            {label.default && (
              <div className="flex items-center ml-auto text-green-600 text-xs font-medium">
                <LucideReact.CheckCircle
                  size={12}
                  className="text-green-500"
                  aria-hidden="true"
                />
                <span className="ml-1">Default</span>
              </div>
            )}
          </div>
          {/* Description, truncated */}
          {label.description && (
            <p className="mt-2 text-xs text-gray-500 line-clamp-2">
              {label.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
