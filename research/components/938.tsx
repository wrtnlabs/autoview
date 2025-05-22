import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stateRaw = value.state ?? "unknown";
  const stateLabel = stateRaw.charAt(0).toUpperCase() + stateRaw.slice(1);
  const stateColors: Record<string, string> = {
    queued: "bg-yellow-100 text-yellow-800",
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    exporting: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    succeeded: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };
  const badgeClass = stateColors[stateRaw.toLowerCase()] ?? "bg-gray-100 text-gray-800";

  const formattedDate = value.completed_at
    ? new Date(value.completed_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : "N/A";

  const shortSha = value.sha ? value.sha.slice(0, 7) : "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Export Details</h2>
        <span className={`px-2 py-1 text-xs font-medium rounded ${badgeClass}`}>
          {stateLabel}
        </span>
      </div>

      <dl className="space-y-2">
        {value.branch != null && (
          <div className="flex justify-between">
            <dt className="text-gray-600">Branch</dt>
            <dd className="text-gray-800 font-medium truncate">{value.branch}</dd>
          </div>
        )}

        {value.sha != null && (
          <div className="flex justify-between">
            <dt className="text-gray-600">Commit</dt>
            <dd className="text-gray-800 font-mono">{shortSha}</dd>
          </div>
        )}

        <div className="flex justify-between">
          <dt className="text-gray-600">Completed</dt>
          <dd className="text-gray-800">{formattedDate}</dd>
        </div>

        {value.export_url && (
          <div className="flex flex-col">
            <dt className="text-gray-600">Export URL</dt>
            <dd className="text-blue-600 text-sm truncate line-clamp-1">{value.export_url}</dd>
          </div>
        )}

        {value.html_url && (
          <div className="flex flex-col">
            <dt className="text-gray-600">Web URL</dt>
            <dd className="text-blue-600 text-sm truncate line-clamp-1">{value.html_url}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
