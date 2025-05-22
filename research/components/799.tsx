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
  const labels = value;
  const totalLabels = labels.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Labels ({totalLabels})</h2>
      </header>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {labels.map((label) => {
          // Prefix the 6-character hex with '#'
          const hexColor = `#${label.color}`;

          return (
            <li
              key={label.id}
              className="flex items-start p-3 bg-gray-50 rounded border border-gray-200"
            >
              <span
                className="flex-shrink-0 w-4 h-4 mt-1 mr-3 rounded"
                style={{ backgroundColor: hexColor }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-1">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{label.name}</h3>
                  {label.default && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded">
                      Default
                    </span>
                  )}
                </div>
                {label.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{label.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
