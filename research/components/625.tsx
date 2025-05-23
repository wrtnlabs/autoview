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
export type AutoViewInput = AutoViewInputSubTypes.autolink;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const matchType = value.is_alphanumeric ? "Alphanumeric" : "Numeric Only";
  const matchIcon = value.is_alphanumeric ? (
    <LucideReact.CheckCircle
      className="ml-2 text-green-500"
      size={16}
      role="img"
      aria-label="Alphanumeric match"
    />
  ) : (
    <LucideReact.XCircle
      className="ml-2 text-red-500"
      size={16}
      role="img"
      aria-label="Numeric only match"
    />
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full sm:max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Tag className="text-blue-500" size={16} />
        <span className="ml-2 text-sm font-medium text-gray-700">Key Prefix</span>
        <span className="ml-auto text-sm text-gray-900">{value.key_prefix}</span>
      </div>

      <div className="flex items-start mb-3">
        <LucideReact.Link className="text-gray-400 mt-0.5" size={16} />
        <div className="ml-2 flex-1">
          <span className="text-sm font-medium text-gray-700">URL Template</span>
          <code className="block w-full font-mono text-sm text-blue-600 truncate">
            {value.url_template}
          </code>
        </div>
      </div>

      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-700">Match Type</span>
        {matchIcon}
        <span className="ml-1 text-sm text-gray-900">{matchType}</span>
      </div>
    </div>
  );
}
