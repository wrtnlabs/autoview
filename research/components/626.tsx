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
  const matchDescription = value.is_alphanumeric
    ? 'Matches alphanumeric characters.'
    : 'Matches numeric characters only.';
  const matchLabel = value.is_alphanumeric ? 'Alphanumeric' : 'Numeric Only';
  const badgeClasses = value.is_alphanumeric
    ? 'bg-green-100 text-green-800'
    : 'bg-blue-100 text-blue-800';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Autolink Reference</h2>
      <dl className="space-y-4">
        <div>
          <dt className="text-sm font-medium text-gray-600">Key Prefix</dt>
          <dd className="mt-1 text-sm text-gray-800">
            <code className="bg-gray-100 px-1 py-0.5 rounded">{value.key_prefix}</code>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-600">URL Template</dt>
          <dd className="mt-1 text-sm text-gray-800 break-all line-clamp-2">
            <code className="bg-gray-100 px-1 py-0.5 rounded">{value.url_template}</code>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-600">Match Pattern</dt>
          <dd className="mt-2 flex items-start space-x-2">
            <span
              className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${badgeClasses}`}
            >
              {matchLabel}
            </span>
            <p className="text-xs text-gray-500">{matchDescription}</p>
          </dd>
        </div>
      </dl>
    </div>
  );
}
