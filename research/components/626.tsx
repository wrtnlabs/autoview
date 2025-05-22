import LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.autolink;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const ruleText = value.is_alphanumeric
    ? "Matches alphanumeric characters"
    : "Matches numeric characters only";
  const ruleIcon = value.is_alphanumeric ? (
    <LucideReact.CheckCircle
      className="text-green-500"
      size={16}
      aria-label="Alphanumeric match"
    />
  ) : (
    <LucideReact.AlertTriangle
      className="text-amber-500"
      size={16}
      aria-label="Numeric-only match"
    />
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mb-3">
        <LucideReact.Link
          className="text-blue-500"
          size={20}
          aria-hidden="true"
        />
        <h3 className="ml-2 text-lg font-semibold text-gray-800">
          Autolink Reference
        </h3>
      </div>
      <div className="space-y-2 text-gray-700">
        <div>
          <span className="font-medium">Key Prefix:</span>{" "}
          <span className="inline-block px-2 py-1 bg-gray-100 rounded text-sm truncate">
            {value.key_prefix}
          </span>
        </div>
        <div>
          <span className="font-medium">URL Template:</span>
          <div className="mt-1 px-2 py-1 bg-gray-50 rounded text-sm text-blue-600 break-all">
            {value.url_template}
          </div>
        </div>
        <div className="flex items-center">
          {ruleIcon}
          <span className="ml-1 text-sm">{ruleText}</span>
        </div>
      </div>
    </div>
  );
}
