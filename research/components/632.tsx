import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.protected_branch_admin_enforced;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { url, enabled } = value;
  // Derive a concise domain or fallback to full URL
  const domain = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();
  const statusLabel = enabled ? "Enabled" : "Disabled";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <LucideReact.Link
            size={16}
            className="text-gray-500"
            aria-hidden="true"
          />
          <span className="font-medium text-gray-800 truncate">{domain}</span>
        </div>
        {enabled ? (
          <LucideReact.CheckCircle
            size={16}
            className="text-green-500"
            aria-label="Protected branch is enabled"
          />
        ) : (
          <LucideReact.XCircle
            size={16}
            className="text-red-500"
            aria-label="Protected branch is disabled"
          />
        )}
      </div>
      <div className="mt-2 text-sm text-gray-600 break-all">{url}</div>
      <div className="mt-4 flex items-center text-sm">
        <span className="font-medium text-gray-700">Status:</span>
        <span
          className={`ml-2 font-semibold ${
            enabled ? "text-green-600" : "text-red-600"
          }`}
        >
          {statusLabel}
        </span>
      </div>
    </div>
  );
}
