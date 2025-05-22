import React from "react";
export namespace AutoViewInputSubTypes {
    export type code_scanning_autofix = {
        status: AutoViewInputSubTypes.code_scanning_autofix_status;
        description: AutoViewInputSubTypes.code_scanning_autofix_description;
        started_at: AutoViewInputSubTypes.code_scanning_autofix_started_at;
    };
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
  type StatusKey = AutoViewInputSubTypes.code_scanning_autofix_status;
  const statusConfig: Record<StatusKey, { label: string; bg: string; text: string }> = {
    pending: { label: "Pending", bg: "bg-yellow-100", text: "text-yellow-800" },
    error: { label: "Error", bg: "bg-red-100", text: "text-red-800" },
    success: { label: "Success", bg: "bg-green-100", text: "text-green-800" },
    outdated: { label: "Outdated", bg: "bg-gray-100", text: "text-gray-800" },
  };

  const { label, bg, text } = statusConfig[value.status];
  const formattedDate = (() => {
    const d = new Date(value.started_at);
    return isNaN(d.getTime())
      ? value.started_at
      : d.toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        });
  })();

  const description = value.description ?? "No description provided.";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Autofix Status</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${bg} ${text}`}>
          {label}
        </span>
      </div>
      <p className="mt-3 text-sm text-gray-700 overflow-hidden line-clamp-3">
        {description}
      </p>
      <p className="mt-4 text-xs text-gray-500">
        Started on: <time dateTime={value.started_at}>{formattedDate}</time>
      </p>
    </div>
  );
}
