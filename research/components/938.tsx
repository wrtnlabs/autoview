import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * An export of a codespace. Also, latest export details for a codespace can be fetched with id = latest
   *
   * @title Fetches information about an export of a codespace.
   */
  export type codespace_export_details = {
    /**
     * State of the latest export
     */
    state?: string | null;
    /**
     * Completion time of the last export operation
     */
    completed_at?: (string & tags.Format<"date-time">) | null;
    /**
     * Name of the exported branch
     */
    branch?: string | null;
    /**
     * Git commit SHA of the exported branch
     */
    sha?: string | null;
    /**
     * Id for the export details
     */
    id?: string;
    /**
     * Url for fetching export details
     */
    export_url?: string;
    /**
     * Web url for the exported branch
     */
    html_url?: string | null;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.codespace_export_details;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived and formatted values
  const branch = value.branch ?? "Unknown branch";
  const sha = value.sha ?? "";
  const shortSha = sha ? sha.slice(0, 7) : "—";
  const completedDate = value.completed_at
    ? new Date(value.completed_at)
    : null;
  const formattedDate = completedDate
    ? completedDate.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : "—";
  const rawState = value.state ?? "";
  const stateLabel = rawState
    ? rawState.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Unknown";

  // Status icon mapping
  function StateIcon() {
    switch (rawState.toLowerCase()) {
      case "pending":
        return <LucideReact.Clock size={16} className="text-amber-500" />;
      case "in_progress":
      case "in progress":
        return (
          <LucideReact.Loader
            size={16}
            className="animate-spin text-blue-500"
          />
        );
      case "completed":
        return <LucideReact.CheckCircle size={16} className="text-green-500" />;
      case "failed":
      case "error":
        return <LucideReact.AlertTriangle size={16} className="text-red-500" />;
      default:
        return <LucideReact.Circle size={16} className="text-gray-400" />;
    }
  }

  // Visual structure
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      {/* Branch & Commit */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <LucideReact.GitBranch size={16} className="text-gray-500" />
          <span className="font-semibold text-gray-800 truncate">{branch}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Code size={16} className="text-gray-500" />
          <span className="font-mono text-gray-600">{shortSha}</span>
        </div>
      </div>

      {/* Export State */}
      <div className="flex items-center gap-2 mb-2">
        <StateIcon />
        <span className="text-sm font-medium text-gray-700">{stateLabel}</span>
      </div>

      {/* Completion Timestamp */}
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
        <LucideReact.Calendar size={16} />
        <span>{formattedDate}</span>
      </div>

      {/* Export URL */}
      {value.export_url && (
        <div className="flex items-start gap-2 mb-1 text-sm text-blue-600 break-words">
          <LucideReact.Link size={16} />
          <span>{value.export_url}</span>
        </div>
      )}

      {/* HTML URL */}
      {value.html_url && (
        <div className="flex items-start gap-2 text-sm text-blue-600 break-words">
          <LucideReact.Link size={16} />
          <span>{value.html_url}</span>
        </div>
      )}
    </div>
  );
}
