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
  // Derived sample URL by replacing placeholder if present
  const sampleUrl = value.url_template.includes("$1")
    ? value.url_template.replace(
        "$1",
        encodeURIComponent(value.key_prefix),
      )
    : value.url_template;

  // Determine match type display and icon
  const matchLabel = value.is_alphanumeric
    ? "Alphanumeric Match"
    : "Numeric Only";
  const matchIcon = value.is_alphanumeric ? (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  ) : (
    <LucideReact.XCircle className="text-red-500" size={16} />
  );

  // Compose the visual card
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Link className="text-blue-500" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Autolink Reference
        </h2>
      </div>
      <div className="space-y-3">
        {/* Key Prefix */}
        <div className="flex items-center">
          <LucideReact.Hash className="text-gray-500" size={16} />
          <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm font-medium text-gray-700 truncate">
            {value.key_prefix}
          </span>
        </div>
        {/* URL Template / Sample Link */}
        <div className="flex items-center">
          <LucideReact.Link className="text-gray-500" size={16} />
          <a
            href={sampleUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-2 text-blue-600 text-sm truncate hover:underline"
            title={sampleUrl}
          >
            {sampleUrl}
          </a>
        </div>
        {/* Match Type Indicator */}
        <div className="flex items-center">
          {matchIcon}
          <span className="ml-2 text-sm text-gray-700">{matchLabel}</span>
        </div>
      </div>
    </div>
  );
}
