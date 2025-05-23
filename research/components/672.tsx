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
  const statusMap: Record<AutoViewInputSubTypes.code_scanning_autofix_status, {
    icon: React.ReactNode;
    label: string;
    textClass: string;
  }> = {
    pending: {
      icon: <LucideReact.Clock className="text-amber-500" size={16} aria-label="Pending" />,
      label: "Pending",
      textClass: "text-amber-600",
    },
    error: {
      icon: <LucideReact.AlertTriangle className="text-red-500" size={16} aria-label="Error" />,
      label: "Error",
      textClass: "text-red-600",
    },
    success: {
      icon: <LucideReact.CheckCircle className="text-green-500" size={16} aria-label="Success" />,
      label: "Success",
      textClass: "text-green-600",
    },
    outdated: {
      icon: <LucideReact.RefreshCw className="text-gray-500" size={16} aria-label="Outdated" />,
      label: "Outdated",
      textClass: "text-gray-600",
    },
  };

  const { icon: statusIcon, label: statusLabel, textClass: statusTextClass } = statusMap[value.status];

  const startedDate = new Date(value.started_at);
  const formattedDate = !isNaN(startedDate.getTime())
    ? startedDate.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : value.started_at;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Status */}
      <div className="flex items-center mb-2">
        {statusIcon}
        <span className={`ml-2 font-medium ${statusTextClass}`}>{statusLabel}</span>
      </div>

      {/* Started At */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <LucideReact.Calendar size={16} className="flex-shrink-0" aria-label="Started at" />
        <time className="ml-1">{formattedDate}</time>
      </div>

      {/* Description */}
      {value.description ? (
        <p className="text-gray-700 text-sm line-clamp-3">{value.description}</p>
      ) : (
        <p className="text-gray-500 italic text-sm">No description provided.</p>
      )}
    </div>
  );
}
