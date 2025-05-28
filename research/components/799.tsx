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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Determine optimal text color (black or white) for given background hex for contrast.
  const getContrastColor = (hex: string): string => {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    // luminance formula
    return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? '#000000' : '#ffffff';
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mx-auto mb-2" />
        <span>No labels available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-wrap gap-3">
        {value.map((label: AutoViewInputSubTypes.label) => {
          const bgColor = `#${label.color}`;
          const textColor = getContrastColor(label.color);
          return (
            <div key={label.id} className="flex flex-col max-w-xs">
              <div
                className="flex items-center gap-1 px-2 py-1 rounded"
                style={{ backgroundColor: bgColor, color: textColor }}
              >
                <span className="text-sm font-medium truncate">{label.name}</span>
                {label.default && (
                  <LucideReact.CheckCircle
                    size={14}
                    className="flex-shrink-0"
                    aria-label="Default label"
                  />
                )}
              </div>
              {label.description && (
                <p className="mt-1 text-gray-600 text-xs line-clamp-2">
                  {label.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
