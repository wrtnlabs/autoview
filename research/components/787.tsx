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
  // Utility to determine appropriate text color (black or white) based on background hex brightness
  const getTextColorClass = (hex: string): "text-black" | "text-white" => {
    const cleaned = hex.replace(/^#/, "");
    const r = parseInt(cleaned.substring(0, 2), 16);
    const g = parseInt(cleaned.substring(2, 4), 16);
    const b = parseInt(cleaned.substring(4, 6), 16);
    // Perceived brightness formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "text-black" : "text-white";
  };

  // If there are no labels, show a placeholder message
  if (!value || value.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-md text-gray-500 text-center">
        No labels to display.
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {value.map((label) => {
        const textColorClass = getTextColorClass(label.color);
        return (
          <li
            key={label.id}
            className="bg-white rounded-lg shadow-sm p-4 flex flex-col"
          >
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${textColorClass}`}
                style={{ backgroundColor: `#${label.color}` }}
              >
                {label.name}
              </span>
              {label.default && (
                <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-1.5 py-0.5 rounded">
                  Default
                </span>
              )}
            </div>
            {label.description && (
              <p className="mt-2 text-sm text-gray-700 truncate">
                {label.description}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
