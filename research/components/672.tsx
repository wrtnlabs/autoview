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
  const statusConfig: Record<AutoViewInputSubTypes.code_scanning_autofix_status, { label: string; color: string }> = {
    pending:  { label: 'Pending',  color: 'bg-yellow-100 text-yellow-800' },
    success:  { label: 'Success',  color: 'bg-green-100 text-green-800' },
    error:    { label: 'Error',    color: 'bg-red-100 text-red-800' },
    outdated: { label: 'Outdated', color: 'bg-gray-100 text-gray-800' },
  };
  const { label: statusLabel, color: statusColor } = statusConfig[value.status];

  const startedDate = new Date(value.started_at);
  const formattedDate = startedDate.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: 'numeric'
  });

  const now = Date.now();
  const diff = now - startedDate.getTime();
  let relativeTime: string;
  if (diff < 60_000) {
    relativeTime = 'Just now';
  } else if (diff < 3_600_000) {
    const m = Math.floor(diff / 60_000);
    relativeTime = `${m} minute${m !== 1 ? 's' : ''} ago`;
  } else if (diff < 86_400_000) {
    const h = Math.floor(diff / 3_600_000);
    relativeTime = `${h} hour${h !== 1 ? 's' : ''} ago`;
  } else {
    const d = Math.floor(diff / 86_400_000);
    relativeTime = `${d} day${d !== 1 ? 's' : ''} ago`;
  }

  const description = value.description ?? 'No description available.';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2 py-1 text-sm font-medium rounded ${statusColor}`}>
          {statusLabel}
        </span>
        <time className="text-xs text-gray-500" dateTime={value.started_at} title={formattedDate}>
          {relativeTime}
        </time>
      </div>
      <p className="text-gray-700 text-sm line-clamp-2">
        {description}
      </p>
    </div>
  );
}
