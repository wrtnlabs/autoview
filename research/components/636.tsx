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
  // 1. Derived constants for display
  const isEnabled = value.enabled;
  const statusText = isEnabled ? "Enabled" : "Disabled";
  const StatusIcon = isEnabled ? LucideReact.CheckCircle : LucideReact.XCircle;
  const statusColor = isEnabled ? "text-green-500" : "text-red-500";

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow border border-gray-200">
      {/* URL Display */}
      <div className="flex items-center gap-2 mb-2">
        <LucideReact.Link
          size={16}
          className="text-gray-500"
          aria-label="URL icon"
        />
        <span className="text-blue-600 truncate break-all" title={value.url}>
          {value.url}
        </span>
      </div>

      {/* Enabled/Disabled Status */}
      <div className="flex items-center gap-2">
        <StatusIcon size={16} className={statusColor} aria-label={statusText} />
        <span className="text-gray-700 font-medium">{statusText}</span>
      </div>
    </div>
  );
}
