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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Extract the domain from the URL for a concise heading
  const domain = (() => {
    try {
      return new URL(value.url).host;
    } catch {
      return value.url;
    }
  })();

  // Prepare status badge text and styles
  const isEnabled = value.enabled;
  const statusText = isEnabled ? "Enabled" : "Disabled";
  const statusBg = isEnabled ? "bg-green-100" : "bg-red-100";
  const statusTextColor = isEnabled ? "text-green-800" : "text-red-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {domain}
          </h2>
          <p className="mt-1 text-sm text-gray-600 truncate break-all">
            {value.url}
          </p>
        </div>
        <span
          className={`ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBg} ${statusTextColor}`}
        >
          {statusText}
        </span>
      </div>
    </div>
  );
}
