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
export type AutoViewInput = AutoViewInputSubTypes.label[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Helper to decide text color (black or white) based on background hex color brightness
  const getTextColorClass = (hex: string): string => {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // formula from YIQ color space
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "text-black" : "text-white";
  };

  const labels = Array.isArray(value) ? value : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (labels.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No labels to display.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {labels.map((label) => {
        const bgClass = `bg-[#${label.color}]`;
        const textClass = getTextColorClass(label.color);
        const description = label.description?.trim() || "No description provided.";
        return (
          <div
            key={label.id}
            className="flex flex-col p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-2 mb-2">
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${bgClass} ${textClass}`}
              >
                {label.name}
              </span>
              {label.default && (
                <span className="inline-block px-1 py-0.5 text-xs bg-gray-200 text-gray-800 rounded">
                  Default
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2 overflow-hidden line-clamp-2">
              {description}
            </p>
            <p className="mt-auto text-xs text-blue-500 truncate">{label.url}</p>
          </div>
        );
      })}
    </div>
  );
}
