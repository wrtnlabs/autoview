import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Protected Branch Admin Enforced
     *
     * @title Protected Branch Admin Enforced
    */
    export type protected_branch_admin_enforced = {
        url: string & tags.Format<"uri">;
        enabled: boolean;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.protected_branch_admin_enforced;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived values: extract host from the URL for cleaner display
  const { url, enabled } = value;
  const host = (() => {
    try {
      return new URL(url).host;
    } catch {
      return url;
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Protected Branch Enforcement
      </h2>

      <div className="text-sm text-gray-700 mb-2">
        <span className="font-medium">Host:</span> {host}
      </div>

      <div className="text-sm text-gray-700 mb-4">
        <span className="font-medium">URL:</span>
        <div
          className="truncate text-blue-600"
          title={url}
        >
          {url}
        </div>
      </div>

      <div className="flex items-center">
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
            enabled
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {enabled ? "Enabled" : "Disabled"}
        </span>
      </div>
    </div>
  );
}
