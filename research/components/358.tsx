import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // 1. Data transformation
  const licenses = Array.isArray(value) ? value : [];

  // 2. Early return for empty state
  if (licenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle
          size={24}
          className="mb-2"
          aria-hidden="true"
        />
        <span className="text-sm">No licenses available</span>
      </div>
    );
  }

  // 3. Render visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Licenses</h2>
      <ul className="space-y-3">
        {licenses.map((license) => {
          const displayUrl = license.html_url ?? license.url;
          const hasLink = Boolean(displayUrl);
          const spdxLabel = license.spdx_id ?? "Custom";

          return (
            <li
              key={license.key}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:shadow transition-shadow"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <LucideReact.FileText
                  size={20}
                  className="flex-shrink-0 text-blue-500"
                  aria-label="License Icon"
                />
                <div className="min-w-0 flex flex-col">
                  <span className="font-medium text-gray-900 truncate">
                    {license.name}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {spdxLabel}
                  </span>
                </div>
              </div>
              {hasLink ? (
                <a
                  href={displayUrl as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 space-x-1 text-sm flex-shrink-0"
                >
                  <LucideReact.Link size={16} aria-hidden="true" />
                  <span>View</span>
                </a>
              ) : (
                <span className="text-sm text-gray-400 flex-shrink-0">
                  No Link
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
