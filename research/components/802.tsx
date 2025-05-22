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
  // Derive full hex color and compute text contrast for accessibility.
  const backgroundColor = `#${value.color}`;

  // Compute brightness to determine if text should be light or dark.
  const hex = value.color.startsWith("#") ? value.color.slice(1) : value.color;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  // Standard luminance formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const textColor = brightness > 128 ? "#1f2937" : "#ffffff"; // dark gray or white

  // Truncate description to two lines if present
  const hasDescription = typeof value.description === "string" && value.description.trim().length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-xs w-full">
      <div className="flex items-center justify-between">
        <span
          className="inline-block px-3 py-1 rounded-full text-sm font-medium"
          style={{ backgroundColor, color: textColor }}
        >
          {value.name}
        </span>
        {value.default && (
          <span className="ml-2 inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
            Default
          </span>
        )}
      </div>
      {hasDescription && (
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {value.description}
        </p>
      )}
      <div className="mt-3 text-xs text-gray-400">
        {/* Show source node ID or URL only if needed for context; here we show the URL truncated */}
        <a
          href={value.url}
          className="underline truncate block"
          title={value.url}
          onClick={(e) => e.preventDefault()}
        >
          {value.url}
        </a>
      </div>
    </div>
  );
}
