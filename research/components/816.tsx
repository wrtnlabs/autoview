import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Page Build Status
   *
   * @title Page Build Status
   */
  export type page_build_status = {
    url: string & tags.Format<"uri">;
    status: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.page_build_status;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Derive the host/domain from the URL for concise display
  const host = (() => {
    try {
      return new URL(value.url).host;
    } catch {
      return value.url;
    }
  })();

  // Normalize and format the status string
  const rawStatus = value.status ?? "";
  const statusKey = rawStatus.trim().toLowerCase();
  const statusText = rawStatus
    .split(/[\s_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // Choose an icon and color based on status semantics
  let StatusIcon = LucideReact.Clock;
  let statusColorClass = "text-amber-500";
  if (statusKey.includes("success")) {
    StatusIcon = LucideReact.CheckCircle;
    statusColorClass = "text-green-500";
  } else if (statusKey.includes("error") || statusKey.includes("fail")) {
    StatusIcon = LucideReact.AlertTriangle;
    statusColorClass = "text-red-500";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col space-y-3">
      {/* URL Display */}
      <div className="flex flex-col">
        <div className="flex items-center text-sm text-gray-700 truncate">
          <LucideReact.Link size={16} className="text-gray-400 flex-shrink-0" />
          <span className="ml-2 font-medium truncate">{host}</span>
        </div>
        <p className="mt-0.5 text-xs text-gray-500 truncate">{value.url}</p>
      </div>

      {/* Status Display */}
      <div className="flex items-center">
        <StatusIcon size={16} className={`${statusColorClass} flex-shrink-0`} />
        <span className="ml-2 text-sm font-medium text-gray-800">
          {statusText}
        </span>
      </div>
    </div>
  );
}
