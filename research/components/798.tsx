import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * An SSH key granting access to a single repository.
     *
     * @title Deploy Key
    */
    export type deploy_key = {
        id: number & tags.Type<"int32">;
        key: string;
        url: string;
        title: string;
        verified: boolean;
        created_at: string;
        read_only: boolean;
        added_by?: string | null;
        last_used?: string | null;
        enabled?: boolean;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.deploy_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const formattedCreated = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const lastUsedDate = value.last_used ? new Date(value.last_used) : null;
  const formattedLastUsed = lastUsedDate
    ? lastUsedDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never used";

  // Truncate the SSH key for display (show first/last 4 characters)
  const keyDisplay =
    value.key.length > 12
      ? `${value.key.slice(0, 4)}…${value.key.slice(-4)}`
      : value.key;

  const accessType = value.read_only ? "Read-Only" : "Read/Write";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.title}
        </h2>
        <div className="flex space-x-2">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              value.verified
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {value.verified ? "Verified" : "Unverified"}
          </span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              value.enabled
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {value.enabled ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm text-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="font-medium text-gray-900">Key:</span>
          <code className="mt-1 sm:mt-0 sm:ml-2 font-mono text-sm text-gray-800 break-all">
            {keyDisplay}
          </code>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="font-medium text-gray-900">Access:</span>
          <span className="mt-1 sm:mt-0 sm:ml-2">{accessType}</span>
        </div>

        {value.added_by != null && (
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-medium text-gray-900">Added by:</span>
            <span className="mt-1 sm:mt-0 sm:ml-2">{value.added_by}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="font-medium text-gray-900">Created:</span>
          <time className="mt-1 sm:mt-0 sm:ml-2">{formattedCreated}</time>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="font-medium text-gray-900">Last used:</span>
          <time className="mt-1 sm:mt-0 sm:ml-2">{formattedLastUsed}</time>
        </div>
      </div>
    </div>
  );
}
