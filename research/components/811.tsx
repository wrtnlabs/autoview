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
  //    Sort labels alphabetically by name for consistent display.
  const sortedLabels = [...value].sort((a, b) => a.name.localeCompare(b.name));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    If there are no labels, show an empty state.
  if (sortedLabels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={32} className="mb-2" />
        <span className="text-sm">No labels to display</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Labels</h2>
      <div className="flex flex-wrap gap-3">
        {sortedLabels.map((label) => (
          <div
            key={label.id}
            className="flex flex-col max-w-xs flex-1 p-3 rounded-lg shadow-sm"
            style={{ backgroundColor: `#${label.color}` }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-white truncate">{label.name}</span>
              {label.default && (
                <LucideReact.CheckCircle
                  size={16}
                  className="text-white opacity-80"
                />
              )}
            </div>
            {label.description && (
              <p className="mt-1 text-sm text-white opacity-90 line-clamp-2">
                {label.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
