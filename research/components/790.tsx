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
  const totalLabels = value.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Labels ({totalLabels})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {value.map((label) => {
          const bgColor = `#${label.color}`;
          return (
            <div
              key={label.id}
              className="flex flex-col p-4 bg-white rounded-lg shadow"
            >
              <div className="flex items-center">
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: bgColor }}
                />
                <h3 className="ml-2 text-md font-medium text-gray-800 truncate">
                  {label.name}
                </h3>
                {label.default && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                    Default
                  </span>
                )}
              </div>
              {label.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
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
