import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * An autolink reference.
     *
     * @title Autolink reference
    */
    export interface autolink {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.autolink[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.length;
  const alphaCount = value.filter(item => item.is_alphanumeric).length;
  const numericOnlyCount = totalCount - alphaCount;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div role="region" aria-label="Autolink References" className="p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <LucideReact.Link size={20} className="text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-900">
          Autolink References ({totalCount})
        </h2>
      </div>

      {/* Summary */}
      <p className="mt-2 text-sm text-gray-600">
        {alphaCount} alphanumeric, {numericOnlyCount} numeric-only
      </p>

      {/* List of references */}
      <ul className="mt-4 space-y-4">
        {value.map(item => (
          <li
            key={item.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-gray-50 rounded-lg"
          >
            {/* Key Prefix */}
            <div className="flex items-center space-x-2">
              <LucideReact.Tag size={16} className="text-blue-500" />
              <span className="font-medium text-gray-800 truncate">{item.key_prefix}</span>
            </div>

            {/* URL Template */}
            <div className="mt-2 md:mt-0 flex-1 flex items-center space-x-2 text-sm text-gray-700 break-all">
              <LucideReact.Link size={16} className="text-gray-500" />
              <code className="font-mono truncate">{item.url_template}</code>
            </div>

            {/* Match Type */}
            <div className="mt-2 md:mt-0 flex items-center space-x-1">
              {item.is_alphanumeric ? (
                <LucideReact.CheckCircle size={16} className="text-green-500" />
              ) : (
                <LucideReact.XCircle size={16} className="text-red-500" />
              )}
              <span className="text-sm text-gray-600">
                {item.is_alphanumeric ? 'Alphanumeric' : 'Numeric-only'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
