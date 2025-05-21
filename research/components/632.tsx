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
  //    Derive the domain/hostname from the full URL for easier display.
  const domain = (() => {
    try {
      return new URL(value.url).hostname;
    } catch {
      return value.url;
    }
  })();

  //    Prepare status text and corresponding Tailwind CSS classes.
  const statusText = value.enabled ? "Enabled" : "Disabled";
  const statusClasses = value.enabled
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Protected Branch Admin Enforcement
      </h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Domain:</span>
          <span className="text-gray-800">{domain}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">URL:</span>
          <span
            className="text-blue-600 truncate block max-w-xs"
            title={value.url}
          >
            {value.url}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">Enforcement:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses}`}
          >
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
}
