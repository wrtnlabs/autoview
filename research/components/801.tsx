import { tags } from "typia";
import React from "react";
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
        "default": boolean;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.label;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Compute the CSS-friendly hex color and determine text color for readability.
  const hexColor = `#${value.color}`;
  // Parse the hex to RGB to compute brightness for contrast
  const { r, g, b } = (() => {
    const h = value.color.padStart(6, "0");
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  })();
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  // If brightness is high, use dark text; otherwise, light text
  const textColorClass = brightness > 128 ? "text-gray-900" : "text-white";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-xs p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <span
          className={`inline-block px-3 py-1 text-sm font-medium ${textColorClass} rounded-full`}
          style={{ backgroundColor: hexColor }}
        >
          {value.name}
        </span>
        {value.default && (
          <span className="px-2 py-0.5 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
            Default
          </span>
        )}
      </div>
      {value.description && (
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">
          {value.description}
        </p>
      )}
      <p className="mt-3 text-xs text-gray-500">
        Color code: <span className="font-mono">{hexColor}</span>
      </p>
    </div>
  );
}
