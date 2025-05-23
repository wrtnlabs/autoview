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
  const totalLabels = value.length;
  const defaultCount = value.filter((label) => label.default).length;

  /**
   * Determine appropriate text color (black or white) based on background brightness.
   * Uses luminance formula: (0.299*R + 0.587*G + 0.114*B)
   */
  function getTextColor(hex: string): string {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luminance = (r * 299 + g * 587 + b * 114) / 1000;
    return luminance > 128 ? "#000000" : "#FFFFFF";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Tag className="text-gray-600" size={20} strokeWidth={1.5} />
        <h2 className="ml-2 text-lg font-semibold text-gray-700">
          Labels ({totalLabels})
        </h2>
        {defaultCount > 0 && (
          <span className="ml-2 text-sm text-gray-500">
            Default: {defaultCount}
          </span>
        )}
      </div>

      {totalLabels === 0 ? (
        <div className="flex items-center text-gray-400">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No labels available</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {value.map((label) => {
            const bgHex = `#${label.color}`;
            const fgHex = getTextColor(label.color);
            return (
              <div
                key={label.node_id}
                className="flex items-center px-2 py-1 rounded-full text-sm font-medium truncate"
                style={{ backgroundColor: bgHex, color: fgHex }}
                title={label.description || undefined}
              >
                <span className="truncate">{label.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
