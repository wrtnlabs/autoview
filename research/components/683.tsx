import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type code_scanning_sarifs_status = {
    /**
     * `pending` files have not yet been processed, while `complete` means results from the SARIF have been stored. `failed` files have either not been processed at all, or could only be partially processed.
     */
    processing_status?: "pending" | "complete" | "failed";
    /**
     * The REST API URL for getting the analyses associated with the upload.
     */
    analyses_url?: (string & tags.Format<"uri">) | null;
    /**
     * Any errors that ocurred during processing of the delivery.
     */
    errors?: string[] | null;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_sarifs_status;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusMap = {
    pending: {
      label: "Pending",
      Icon: LucideReact.Clock,
      color: "text-amber-500",
    },
    complete: {
      label: "Complete",
      Icon: LucideReact.CheckCircle,
      color: "text-green-500",
    },
    failed: {
      label: "Failed",
      Icon: LucideReact.AlertTriangle,
      color: "text-red-500",
    },
  } as const;

  const rawStatus = value.processing_status ?? "pending";
  const {
    label: statusLabel,
    Icon: StatusIcon,
    color: statusColor,
  } = statusMap[rawStatus as keyof typeof statusMap] ?? statusMap.pending;

  const hasErrors = Array.isArray(value.errors) && value.errors.length > 0;
  const errorCount = hasErrors ? value.errors!.length : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Status */}
      <div className="flex items-center gap-2">
        <StatusIcon
          size={20}
          className={statusColor}
          aria-label={statusLabel}
        />
        <span className="text-gray-800 font-medium">{statusLabel}</span>
      </div>

      {/* Analyses URL */}
      {value.analyses_url && (
        <div className="flex items-center gap-2">
          <LucideReact.Link
            size={16}
            className="text-gray-500"
            aria-hidden="true"
          />
          <span
            className="text-sm text-gray-600 truncate"
            title={value.analyses_url}
          >
            {value.analyses_url}
          </span>
        </div>
      )}

      {/* Errors */}
      {hasErrors && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LucideReact.AlertTriangle
              size={18}
              className="text-red-500"
              aria-label="Errors"
            />
            <span className="text-sm font-medium text-red-600">
              {errorCount} error{errorCount > 1 ? "s" : ""} occurred
            </span>
          </div>
          <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
            {value.errors!.map((err, idx) => (
              <li key={idx} className="truncate" title={err}>
                {err}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
