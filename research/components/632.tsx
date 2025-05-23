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
  // 1. Derive the hostname to display a concise URL
  let hostname: string;
  try {
    hostname = new URL(value.url).hostname;
  } catch {
    hostname = value.url;
  }

  // 2. Prepare the status icon based on `enabled`
  const statusIcon = value.enabled ? (
    <LucideReact.CheckCircle
      className="text-green-500"
      size={16}
      aria-label="Protected branch enforced"
    />
  ) : (
    <LucideReact.XCircle
      className="text-red-500"
      size={16}
      aria-label="Protected branch not enforced"
    />
  );

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">
          Protected Branch
        </span>
        {statusIcon}
      </div>
      <div className="flex items-center text-gray-600 text-sm">
        <LucideReact.Link
          className="mr-1 text-gray-400 flex-shrink-0"
          size={16}
          aria-hidden="true"
        />
        <span className="truncate" title={value.url}>
          {hostname}
        </span>
      </div>
    </div>
  );
}
