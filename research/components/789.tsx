import * as LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalLabels = value.length;
  const defaultLabelsCount = value.filter((label) => label.default).length;

  // Utility to determine readable text color (black or white) based on background hex.
  const getContrastTextColor = (hex: string): string => {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Perceived luminance formula
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary of labels */}
      <div className="mb-4 text-sm text-gray-600 flex items-center gap-1">
        <LucideReact.Tag
          size={16}
          className="text-gray-500"
          aria-hidden="true"
        />
        <span>
          {totalLabels} label{totalLabels !== 1 ? "s" : ""},{" "}
          {defaultLabelsCount} default
        </span>
      </div>

      {/* Label list */}
      <div className="flex flex-wrap gap-3">
        {value.map((label) => (
          <div key={label.id} className="flex flex-col max-w-xs">
            <div
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: `#${label.color}`,
                color: getContrastTextColor(label.color),
              }}
            >
              <LucideReact.Tag size={16} aria-hidden="true" />
              <span className="truncate">{label.name}</span>
            </div>
            {label.description && (
              <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                {label.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
