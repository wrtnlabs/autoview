import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Color-coded labels help you categorize and filter your issues (just like labels in Gmail).
     *
     * @title Label
    */
    export interface label {
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
        "default": boolean;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.label[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper to determine appropriate text color (black or white) based on background brightness
  const getContrastColor = (hex: string): string => {
    const cleanHex = hex.replace(/^#/, '').slice(0, 6);
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    // Standard luminance calculation
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 186 ? '#000000' : '#ffffff';
  };

  // Handle empty or undefined list
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={24} aria-hidden="true" />
        <span className="ml-2">No labels available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {value.map((label) => {
        const bgColor = `#${label.color}`;
        const textColor = getContrastColor(label.color);
        return (
          <span
            key={label.id}
            className="inline-flex items-center gap-1 max-w-xs truncate px-2 py-1 text-xs font-medium rounded-full"
            style={{ backgroundColor: bgColor, color: textColor }}
            title={label.description || label.name}
            aria-label={label.name + (label.description ? `: ${label.description}` : '')}
          >
            {label.default && (
              <LucideReact.Star
                size={12}
                strokeWidth={2}
                className="opacity-75"
                aria-label="Default label"
              />
            )}
            <span className="truncate">{label.name}</span>
          </span>
        );
      })}
    </div>
  );
}
