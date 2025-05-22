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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const labels = value;
  // Utility to decide text color (black or white) based on background luminance
  const getTextColor = (hex: string): string => {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 186 ? "#000000" : "#FFFFFF";
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (labels.length === 0) {
    return (
      <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-md">
        <LucideReact.AlertCircle className="text-gray-400" size={24} />
        <span className="text-gray-500">No labels to display</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-wrap gap-3">
        {labels.map((label) => {
          const bgColor = `#${label.color}`;
          const textColor = getTextColor(label.color);
          return (
            <div key={label.id} className="flex flex-col items-start max-w-xs">
              <span
                className="px-3 py-1 rounded-full text-sm font-medium truncate"
                style={{ backgroundColor: bgColor, color: textColor }}
                title={label.description ?? label.name}
              >
                {label.name}
              </span>
              {label.description ? (
                <p className="mt-1 text-gray-600 text-xs truncate w-full">
                  {label.description}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
