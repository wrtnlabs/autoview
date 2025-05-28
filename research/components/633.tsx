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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusText = value.enabled ? "Enabled" : "Disabled";
  const statusIcon = value.enabled ? (
    <LucideReact.CheckCircle className="text-green-500" size={16} aria-label="Enabled" />
  ) : (
    <LucideReact.XCircle className="text-red-500" size={16} aria-label="Disabled" />
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Protected Branch Enforcement</h2>
        <div className="flex items-center">
          {statusIcon}
          <span className="ml-1 text-sm font-medium text-gray-700">{statusText}</span>
        </div>
      </div>
      <div className="flex items-center text-gray-600 text-sm">
        <LucideReact.Link size={16} className="flex-shrink-0 text-gray-400" aria-label="URL" />
        <span className="ml-1 truncate">{value.url}</span>
      </div>
    </div>
  );
}
