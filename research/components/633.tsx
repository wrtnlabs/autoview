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
  const displayUrl = value.url.replace(/^https?:\/\/+/i, "");
  const statusLabel = value.enabled ? "Enabled" : "Disabled";
  const StatusIcon = value.enabled
    ? LucideReact.CheckCircle
    : LucideReact.XCircle;
  const statusColor = value.enabled ? "text-green-500" : "text-red-500";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section
      role="region"
      aria-label="Protected Branch Admin Enforcement"
      className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4"
    >
      {/* URL display */}
      <div className="flex items-center text-sm text-gray-600 overflow-hidden">
        <LucideReact.Link
          size={16}
          className="flex-shrink-0 mr-2 text-gray-500"
          aria-hidden="true"
        />
        <span className="truncate">{displayUrl}</span>
      </div>

      {/* Status display */}
      <div className="flex items-center text-sm mt-3">
        <StatusIcon
          size={16}
          className={`${statusColor} flex-shrink-0 mr-2`}
          aria-label={statusLabel}
        />
        <span className="font-medium text-gray-700">{statusLabel}</span>
      </div>
    </section>
  );
}
