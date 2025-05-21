import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.autolink;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const patternLabel = value.is_alphanumeric ? "Alphanumeric" : "Numeric";
  const patternBadgeClasses = value.is_alphanumeric
    ? "bg-green-100 text-green-800"
    : "bg-blue-100 text-blue-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Autolink Reference</h2>
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="font-medium text-gray-700 w-32">Key Prefix:</span>
          <code className="mt-1 sm:mt-0 bg-gray-100 text-gray-800 px-2 py-1 rounded break-all">
            {value.key_prefix}
          </code>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start">
          <span className="font-medium text-gray-700 w-32">URL Template:</span>
          <code className="mt-1 sm:mt-0 bg-gray-100 text-gray-800 px-2 py-1 rounded break-all">
            {value.url_template}
          </code>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="font-medium text-gray-700 w-32">Pattern:</span>
          <span
            className={`inline-block mt-1 sm:mt-0 px-2 py-0.5 text-xs font-semibold rounded ${patternBadgeClasses}`}
          >
            {patternLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
