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
export type AutoViewInput = AutoViewInputSubTypes.label;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Determine contrasting text color (black or white) for given background.
  const getContrastColor = (hex: string): string => {
    // Remove leading '#' if present
    const cleaned = hex.replace("#", "");
    const r = parseInt(cleaned.substring(0, 2), 16);
    const g = parseInt(cleaned.substring(2, 4), 16);
    const b = parseInt(cleaned.substring(4, 6), 16);
    // YIQ formula to determine brightness
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#000000" : "#FFFFFF";
  };

  const bgColor = `#${value.color}`;
  const textColor = getContrastColor(bgColor);
  const hexCode = `#${value.color.toUpperCase()}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div
          className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            border: `1px solid ${bgColor}`,
          }}
          aria-label={`Label: ${value.name}`}
        >
          {value.name}
        </div>
        {value.default && (
          <div className="flex items-center text-green-600 text-sm font-medium">
            <LucideReact.CheckCircle size={16} className="mr-1" />
            <span>Default</span>
          </div>
        )}
      </div>
      {value.description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {value.description}
        </p>
      )}
      <div className="mt-3 text-xs text-gray-400 font-mono">{hexCode}</div>
    </div>
  );
}
