import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * License Simple
     *
     * @title License Simple
    */
    export type license_simple = {
        key: string;
        name: string;
        url: (string & tags.Format<"uri">) | null;
        spdx_id: string | null;
        node_id: string;
        html_url?: string & tags.Format<"uri">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.license_simple[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const licenseCount = value.length;

  // Utility to truncate long URLs or text for a concise display.
  function truncate(text: string, maxLen: number): string {
    return text.length > maxLen ? text.slice(0, maxLen).trim() + '…' : text;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {licenseCount === 0 ? (
        <p className="text-center text-gray-500">No licenses available.</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Licenses ({licenseCount})
          </h2>
          <div className="space-y-4">
            {value.map((license) => (
              <div key={license.key} className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-800 truncate">
                  {license.name}
                </h3>
                <p className="text-sm text-gray-600">
                  SPDX ID:{' '}
                  <span className="font-semibold">
                    {license.spdx_id ?? 'N/A'}
                  </span>
                </p>
                <div className="mt-2 space-y-1">
                  <div>
                    <p className="text-xs text-gray-700">URL:</p>
                    <p
                      title={license.url ?? ''}
                      className="text-xs text-gray-600 break-all line-clamp-1"
                    >
                      {license.url ? truncate(license.url, 50) : 'N/A'}
                    </p>
                  </div>
                  {license.html_url != null && (
                    <div>
                      <p className="text-xs text-gray-700">HTML URL:</p>
                      <p
                        title={license.html_url}
                        className="text-xs text-gray-600 break-all line-clamp-1"
                      >
                        {truncate(license.html_url, 50)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
