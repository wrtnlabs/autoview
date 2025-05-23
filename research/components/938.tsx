import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * An export of a codespace. Also, latest export details for a codespace can be fetched with id = latest
     *
     * @title Fetches information about an export of a codespace.
    */
    export interface codespace_export_details {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.codespace_export_details;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const state = value.state ?? "unknown";
  const stateKey = state.toLowerCase();
  let StatusIcon: JSX.Element;
  switch (stateKey) {
    case "completed":
      StatusIcon = <LucideReact.CheckCircle aria-label="Completed" role="img" size={16} className="text-green-500" />;
      break;
    case "failed":
      StatusIcon = <LucideReact.AlertTriangle aria-label="Failed" role="img" size={16} className="text-red-500" />;
      break;
    case "pending":
    case "queued":
      StatusIcon = <LucideReact.Clock aria-label="Pending" role="img" size={16} className="text-amber-500" />;
      break;
    default:
      StatusIcon = <LucideReact.HelpCircle aria-label="Unknown status" role="img" size={16} className="text-gray-500" />;
  }

  const completedAt = value.completed_at
    ? new Date(value.completed_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const shortSha = value.sha ? value.sha.slice(0, 7) : null;
  const branchName = value.branch ?? "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{branchName}</h3>
        <div className="flex items-center gap-1">
          {StatusIcon}
          <span className="text-sm text-gray-600 capitalize truncate">{stateKey}</span>
        </div>
      </div>
      <ul className="space-y-2 text-sm text-gray-700">
        {shortSha && (
          <li className="flex items-center gap-2">
            <LucideReact.GitCommit size={16} className="text-gray-500" aria-label="Commit" role="img" />
            <span className="truncate">Commit: {shortSha}</span>
          </li>
        )}
        {completedAt && (
          <li className="flex items-center gap-2">
            <LucideReact.Calendar size={16} className="text-gray-500" aria-label="Completed at" role="img" />
            <span className="truncate">Completed: {completedAt}</span>
          </li>
        )}
        {value.html_url && (
          <li className="flex items-center gap-2">
            <LucideReact.Link size={16} className="text-gray-500" aria-label="Export URL" role="img" />
            <span className="truncate">URL: {value.html_url}</span>
          </li>
        )}
      </ul>
    </div>
  );
}
