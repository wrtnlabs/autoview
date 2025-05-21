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

  // Helper to determine contrasting text color (blackish or white) based on background hex
  const getContrastTextClass = (hex: string): string => {
    // Remove any leading '#' and parse r/g/b
    const cleanHex = hex.replace(/^#/, "");
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    // Perceived brightness formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "text-gray-800" : "text-white";
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const labels = value;

  // 3. Return the React element.
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Labels ({labels.length})
      </h2>
      {labels.length === 0 ? (
        <p className="text-gray-500">No labels to display.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {labels.map((label) => {
            const textColorClass = getContrastTextClass(label.color);
            return (
              <li
                key={label.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <div className="flex items-center flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${textColorClass}`}
                    style={{ backgroundColor: `#${label.color}` }}
                  >
                    {label.name}
                  </span>
                  {label.default && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      Default
                    </span>
                  )}
                </div>
                {label.description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {label.description}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
