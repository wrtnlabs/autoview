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
  // 1. Data transformation
  const labels = Array.isArray(value) ? value : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Labels</h2>
      {labels.length === 0 ? (
        <p className="text-gray-500">No labels available.</p>
      ) : (
        <ul className="space-y-4">
          {labels.map((label) => {
            const swatchColor = `#${label.color}`;
            return (
              <li key={label.id} className="flex items-start space-x-3">
                {/* Color swatch */}
                <div className="flex-shrink-0">
                  <span
                    className="block w-5 h-5 rounded-full border border-gray-200"
                    style={{ backgroundColor: swatchColor }}
                  />
                </div>
                {/* Label content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-gray-900 font-medium truncate">
                      {label.name}
                    </h3>
                    {label.default && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  {label.description && (
                    <p className="text-gray-600 text-sm mt-1 overflow-hidden line-clamp-2">
                      {label.description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
