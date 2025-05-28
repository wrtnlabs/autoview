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
  // 1. Define data aggregation/transformation
  const totalCount = value.length;
  const defaultCount = value.filter(label => label.default).length;
  const customCount = totalCount - defaultCount;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {totalCount > 0 ? (
        <>
          {/* Summary */}
          <div className="mb-4 text-sm text-gray-600">
            {totalCount} Label{totalCount !== 1 ? "s" : ""} (
            <span className="font-medium">Default:</span> {defaultCount},{" "}
            <span className="font-medium">Custom:</span> {customCount})
          </div>
          {/* Labels Grid */}
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {value.map(label => (
              <li
                key={label.id}
                className="flex items-start space-x-2 p-2 bg-gray-50 rounded-md"
              >
                {/* Color indicator */}
                <span
                  aria-label={`Color ${label.color}`}
                  className="w-3 h-3 mt-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: `#${label.color}` }}
                />
                <div className="flex-1 min-w-0">
                  {/* Name and Default Icon */}
                  <div className="flex items-center space-x-1">
                    <span className="truncate font-medium text-sm text-gray-800">
                      {label.name}
                    </span>
                    {label.default && (
                      <LucideReact.CheckCircle
                        className="text-green-500 flex-shrink-0"
                        size={14}
                        aria-label="Default Label"
                      />
                    )}
                  </div>
                  {/* Description */}
                  {label.description && (
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                      {label.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center p-6 text-gray-400">
          <LucideReact.AlertCircle size={48} aria-hidden="true" />
          <span className="mt-2 text-sm">No labels available</span>
        </div>
      )}
    </div>
  );
}
