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
  // Derive the full hex color and contrast text color for readability
  const labelColor = `#${value.color}`;
  function getContrastColor(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }
  const contrastColor = getContrastColor(labelColor);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-start space-x-4">
      {/* Color swatch */}
      <div
        className="flex-shrink-0 w-3 h-3 rounded-full mt-1.5"
        style={{ backgroundColor: labelColor }}
      />
      <div className="flex-1">
        {/* Label name with background pill and optional default icon */}
        <div className="flex items-center space-x-2">
          <span
            className="px-2 py-0.5 text-sm font-medium rounded"
            style={{ backgroundColor: labelColor, color: contrastColor }}
          >
            {value.name}
          </span>
          {value.default && (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
              aria-label="Default label"
            />
          )}
        </div>
        {/* Optional truncated description */}
        {value.description && (
          <p className="mt-1 text-gray-600 text-sm line-clamp-2">
            {value.description}
          </p>
        )}
      </div>
    </div>
  );
}
