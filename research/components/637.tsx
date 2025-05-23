import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Protected Branch Admin Enforced
     *
     * @title Protected Branch Admin Enforced
    */
    export interface protected_branch_admin_enforced {
        url: string & tags.Format<"uri">;
        enabled: boolean;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.protected_branch_admin_enforced;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived values for status display
  const statusLabel = value.enabled ? "Enabled" : "Disabled";
  const statusColor = value.enabled ? "text-green-500" : "text-red-500";
  const StatusIcon = value.enabled
    ? <LucideReact.CheckCircle size={16} className={statusColor} aria-label="Enabled" />
    : <LucideReact.XCircle size={16} className={statusColor} aria-label="Disabled" />;

  // JSX structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md w-full">
      <div className="flex flex-col space-y-3">
        {/* URL Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 text-sm">
            <LucideReact.Link size={16} className="mr-1" />
            <span>URL</span>
          </div>
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-blue-600 text-sm font-medium hover:underline"
          >
            {value.url}
          </a>
        </div>
        {/* Admin Enforced Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 text-sm">
            <LucideReact.ShieldCheck size={16} className="mr-1" />
            <span>Admin Enforced</span>
          </div>
          <div className="flex items-center text-sm font-medium">
            {StatusIcon}
            <span className="ml-1">{statusLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
