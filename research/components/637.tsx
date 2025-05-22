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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants.
  const hostname = (() => {
    try {
      return new URL(value.url).hostname;
    } catch {
      return value.url;
    }
  })();
  const statusText = value.enabled ? 'Enabled' : 'Disabled';
  const statusClasses = value.enabled
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Protected Branch Enforcement
        </h2>
        <span className={`px-2 py-1 text-sm font-medium rounded ${statusClasses}`}>
          {statusText}
        </span>
      </div>
      <div className="mt-4">
        <div className="text-xs font-medium text-gray-500 uppercase">
          Branch URL
        </div>
        <div
          className="mt-1 text-sm text-gray-700 truncate"
          title={value.url}
        >
          {value.url}
        </div>
        <div className="mt-1 text-xs text-gray-400">
          Host: {hostname}
        </div>
      </div>
    </div>
  );
}
