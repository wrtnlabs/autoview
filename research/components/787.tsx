import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    default: boolean;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.label[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants
  const labels = Array.isArray(value) ? value : [];
  const totalCount = labels.length;
  const defaultCount = labels.filter((lbl) => lbl.default).length;

  // 2. Empty state
  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg">
        <LucideReact.AlertCircle className="text-gray-400 mb-2" size={48} />
        <p className="text-gray-500">No labels available</p>
      </div>
    );
  }

  // 3. Render label list
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Labels ({totalCount})
        </h2>
        {defaultCount > 0 && (
          <span className="text-sm text-gray-600">{defaultCount} default</span>
        )}
      </div>
      <ul className="space-y-3">
        {labels.map((label) => (
          <li
            key={label.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-md"
          >
            <div className="flex items-start sm:items-center gap-3">
              <span
                style={{ backgroundColor: `#${label.color}` }}
                className="w-3 h-3 rounded-full mt-1 sm:mt-0 flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 truncate">
                    {label.name}
                  </span>
                  {label.default && (
                    <span className="text-xs text-green-700 bg-green-100 px-1.5 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                  {label.description || "No description"}
                </p>
              </div>
            </div>
            <div className="flex items-center text-gray-400 text-xs mt-2 sm:mt-0 sm:ml-6 overflow-hidden">
              <LucideReact.Link size={16} className="flex-shrink-0 mr-1" />
              <span className="truncate">{label.url}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
