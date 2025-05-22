import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * An autolink reference.
   *
   * @title Autolink reference
   */
  export type autolink = {
    id: number & tags.Type<"int32">;
    /**
     * The prefix of a key that is linkified.
     */
    key_prefix: string;
    /**
     * A template for the target URL that is generated if a key was found.
     */
    url_template: string;
    /**
     * Whether this autolink reference matches alphanumeric characters. If false, this autolink reference only matches numeric characters.
     */
    is_alphanumeric: boolean;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.autolink[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Determine if there are any autolink references to display
  const hasItems = Array.isArray(value) && value.length > 0;

  // 3. Return placeholder for empty state
  if (!hasItems) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <p className="text-sm">No autolink references available.</p>
      </div>
    );
  }

  // 1. (No complex transformations needed for this schema)

  // 2. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <LucideReact.Link className="mr-2 text-gray-600" size={20} />
        Autolink References
      </h2>
      <ul className="space-y-3">
        {value.map((ref) => (
          <li
            key={ref.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full">
              <div className="flex items-center text-gray-800">
                <LucideReact.Tag className="mr-1 text-gray-500" size={16} />
                <span className="font-medium truncate">{ref.key_prefix}</span>
              </div>
              <div className="flex items-center text-blue-600 mt-1 sm:mt-0 w-full">
                <LucideReact.Link className="mr-1 flex-shrink-0" size={16} />
                <span className="truncate break-words">{ref.url_template}</span>
              </div>
            </div>
            <div className="mt-2 sm:mt-0">
              {ref.is_alphanumeric ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-100 text-green-800">
                  <LucideReact.CheckCircle className="mr-1" size={14} />
                  Alphanumeric
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                  <LucideReact.Hash className="mr-1" size={14} />
                  Numeric Only
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
