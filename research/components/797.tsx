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
  const createdAt = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const lastUsed = value.last_used
    ? new Date(value.last_used).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Never used";
  const addedBy = value.added_by ?? "Unknown";
  const formattedKey =
    value.key.length > 60
      ? `${value.key.slice(0, 30)}…${value.key.slice(-30)}`
      : value.key;
  const statusReadOnly = value.read_only ? "Read-only" : "Read/Write";
  const statusEnabled =
    value.enabled === false ? "Disabled" : "Enabled";
  const statusVerified = value.verified ? "Verified" : "Unverified";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Title and Verified Badge */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.title}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            value.verified
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {statusVerified}
        </span>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
          {statusReadOnly}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded ${
            value.enabled === false
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {statusEnabled}
        </span>
      </div>

      {/* SSH Key Preview */}
      <div>
        <h3 className="text-sm font-medium text-gray-700">Key</h3>
        <code className="block mt-1 p-2 bg-gray-50 text-xs text-gray-800 rounded overflow-x-auto whitespace-nowrap">
          {formattedKey}
        </code>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <div className="font-medium text-gray-700">Added by</div>
          <div>{addedBy}</div>
        </div>
        <div>
          <div className="font-medium text-gray-700">Created</div>
          <div>{createdAt}</div>
        </div>
        <div>
          <div className="font-medium text-gray-700">Last used</div>
          <div>{lastUsed}</div>
        </div>
      </div>
    </div>
  );
}
