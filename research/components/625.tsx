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
export type AutoViewInput = AutoViewInputSubTypes.autolink;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const alphanumericStatus = value.is_alphanumeric
    ? "Alphanumeric"
    : "Numeric only";
  const StatusIcon = value.is_alphanumeric
    ? LucideReact.CheckCircle
    : LucideReact.XCircle;
  const statusColor = value.is_alphanumeric ? "text-green-500" : "text-red-500";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md text-gray-700">
      <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
        <LucideReact.Link size={20} className="text-blue-500" />
        Autolink Reference
      </h2>
      <dl className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <dt className="font-medium text-gray-600">Key Prefix</dt>
          <dd className="mt-1 sm:mt-0">
            <div className="flex items-center gap-2 text-gray-800">
              <LucideReact.Tag size={16} className="text-gray-400" />
              <span className="break-all">{value.key_prefix}</span>
            </div>
          </dd>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <dt className="font-medium text-gray-600">URL Template</dt>
          <dd className="mt-1 sm:mt-0">
            <div className="flex items-center gap-2 text-blue-600">
              <LucideReact.Link size={16} className="text-gray-400" />
              <span className="break-all">{value.url_template}</span>
            </div>
          </dd>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <dt className="font-medium text-gray-600">Match Type</dt>
          <dd className={`mt-1 sm:mt-0 flex items-center gap-1 ${statusColor}`}>
            <StatusIcon size={16} />
            <span>{alphanumericStatus}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
