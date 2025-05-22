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

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derive background and text colors for the label badge
  const bgColor = `#${value.color}`;
  const getContrastYIQ = (hex: string): "black" | "white" => {
    const c = hex.startsWith("#") ? hex.substring(1) : hex;
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
  };
  const textColor = getContrastYIQ(bgColor);

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <span
          role="img"
          aria-label={`Label color #${value.color}`}
          className="inline-block px-2 py-1 rounded text-sm font-medium truncate"
          style={{ backgroundColor: bgColor, color: textColor }}
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
      {value.description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {value.description}
        </p>
      )}
    </div>
  );
}
