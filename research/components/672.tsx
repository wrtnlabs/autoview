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

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define derived values: icon, status text, formatted date, and safe description.
  const statusIconMap: Record<
    AutoViewInputSubTypes.code_scanning_autofix_status,
    JSX.Element
  > = {
    pending: <LucideReact.Clock className="text-amber-500" size={20} />,
    error: <LucideReact.AlertTriangle className="text-red-500" size={20} />,
    success: <LucideReact.CheckCircle className="text-green-500" size={20} />,
    outdated: <LucideReact.RefreshCw className="text-gray-500" size={20} />,
  };
  const statusTextMap: Record<
    AutoViewInputSubTypes.code_scanning_autofix_status,
    string
  > = {
    pending: "Pending",
    error: "Error",
    success: "Success",
    outdated: "Outdated",
  };
  const icon = statusIconMap[value.status];
  const statusLabel = statusTextMap[value.status];
  const startedDate = new Date(value.started_at);
  const formattedDate = startedDate.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const description =
    value.description && value.description.trim()
      ? value.description
      : "No description provided";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-sm space-y-3">
      <div className="flex items-center space-x-2">
        {icon}
        <span className="text-lg font-medium text-gray-800">{statusLabel}</span>
      </div>
      <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
      <div className="flex items-center text-gray-500 text-xs">
        <LucideReact.Calendar size={16} className="mr-1" />
        <span title={value.started_at}>Started on {formattedDate}</span>
      </div>
    </div>
  );
}
