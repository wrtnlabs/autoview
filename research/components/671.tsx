import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface code_scanning_autofix {
        status: AutoViewInputSubTypes.code_scanning_autofix_status;
        description: AutoViewInputSubTypes.code_scanning_autofix_description;
        started_at: AutoViewInputSubTypes.code_scanning_autofix_started_at;
    }
    /**
     * The status of an autofix.
    */
    export type code_scanning_autofix_status = "pending" | "error" | "success" | "outdated";
    /**
     * The description of an autofix.
    */
    export type code_scanning_autofix_description = string | null;
    /**
     * The start time of an autofix in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type code_scanning_autofix_started_at = string;
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_autofix;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusConfig: Record<
    AutoViewInputSubTypes.code_scanning_autofix_status,
    {
      label: string
      icon: React.ComponentType<any>
      color: string
    }
  > = {
    pending: {
      label: "Pending",
      icon: LucideReact.Clock,
      color: "text-amber-500",
    },
    error: {
      label: "Error",
      icon: LucideReact.AlertTriangle,
      color: "text-red-500",
    },
    success: {
      label: "Success",
      icon: LucideReact.CheckCircle,
      color: "text-green-500",
    },
    outdated: {
      label: "Outdated",
      icon: LucideReact.RefreshCw,
      color: "text-gray-500",
    },
  }

  const { label: statusLabel, icon: StatusIcon, color: statusColor } =
    statusConfig[value.status]

  const formattedStart = new Date(value.started_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })

  const hasDescription =
    typeof value.description === "string" && value.description.trim().length > 0

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow">
      {/* Status */}
      <div className="flex items-center gap-2">
        <StatusIcon size={20} className={statusColor} aria-hidden="true" />
        <span className="text-lg font-medium text-gray-800">
          {statusLabel}
        </span>
      </div>
      {/* Start Time */}
      <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
        <LucideReact.Calendar size={16} className="flex-shrink-0" />
        <time dateTime={value.started_at}>{formattedStart}</time>
      </div>
      {/* Description */}
      <div className="mt-4 text-sm text-gray-700">
        {hasDescription ? (
          <p className="line-clamp-2">{value.description}</p>
        ) : (
          <p className="italic text-gray-400">No description provided.</p>
        )}
      </div>
    </div>
  )
}
