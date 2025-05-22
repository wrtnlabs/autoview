import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type code_scanning_autofix = {
    status: AutoViewInputSubTypes.code_scanning_autofix_status;
    description: AutoViewInputSubTypes.code_scanning_autofix_description;
    started_at: AutoViewInputSubTypes.code_scanning_autofix_started_at;
  };
  /**
   * The status of an autofix.
   */
  export type code_scanning_autofix_status =
    | "pending"
    | "error"
    | "success"
    | "outdated";
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
  const { status, description, started_at } = value;

  // Map status to icon and human‐readable label
  const statusConfig: Record<
    AutoViewInputSubTypes.code_scanning_autofix_status,
    { icon: React.ReactNode; label: string }
  > = {
    pending: {
      icon: <LucideReact.Clock className="text-amber-500" size={16} />,
      label: "Pending",
    },
    error: {
      icon: <LucideReact.AlertTriangle className="text-red-500" size={16} />,
      label: "Error",
    },
    success: {
      icon: <LucideReact.CheckCircle className="text-green-500" size={16} />,
      label: "Success",
    },
    outdated: {
      icon: <LucideReact.RefreshCw className="text-gray-500" size={16} />,
      label: "Outdated",
    },
  };
  const { icon: statusIcon, label: statusLabel } = statusConfig[status];

  // Format the start date as a human‐readable string
  const startedDate = new Date(started_at);
  const formattedStartedAt = startedDate.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-2">
        {statusIcon}
        <span className="text-gray-800 font-medium">{statusLabel}</span>
      </div>
      {description != null && description !== "" && (
        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{description}</p>
      )}
      <div className="flex items-center text-sm text-gray-500">
        <LucideReact.Calendar size={16} className="mr-1" />
        <span>Started:&nbsp;{formattedStartedAt}</span>
      </div>
    </div>
  );
}
