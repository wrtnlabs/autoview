import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Page Build Status
     *
     * @title Page Build Status
    */
    export interface page_build_status {
        url: string & tags.Format<"uri">;
        status: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.page_build_status;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derive a normalized status key and a human-friendly label
  const statusKey = value.status.trim().toLowerCase();
  const displayStatus = statusKey.charAt(0).toUpperCase() + statusKey.slice(1);

  // Choose an icon and color based on common build-status keywords
  let StatusIcon: JSX.Element;
  switch (statusKey) {
    case "success":
    case "built":
    case "completed":
      StatusIcon = <LucideReact.CheckCircle size={16} className="text-green-500" />;
      break;
    case "failed":
    case "error":
      StatusIcon = <LucideReact.AlertTriangle size={16} className="text-red-500" />;
      break;
    case "pending":
    case "building":
    case "in progress":
      StatusIcon = <LucideReact.Clock size={16} className="text-amber-500" />;
      break;
    default:
      StatusIcon = <LucideReact.Info size={16} className="text-gray-400" />;
  }

  // Render a read-only status card with URL and build status
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
      {/* URL Display */}
      <div className="flex items-center gap-1 w-full md:w-auto overflow-hidden">
        <LucideReact.Link size={16} className="text-gray-500 flex-shrink-0" />
        <span className="text-gray-800 truncate">{value.url}</span>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center gap-1">
        {StatusIcon}
        <span className="text-gray-700">{displayStatus}</span>
      </div>
    </div>
  );
}
