import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * An SSH key granting access to a single repository.
     *
     * @title Deploy Key
    */
    export interface deploy_key {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.deploy_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const formattedLastUsed = value.last_used
    ? new Date(value.last_used).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Never used";
  const displayAddedBy = value.added_by ?? "Unknown";
  const maskedKey =
    value.key.length > 20
      ? `${value.key.slice(0, 12)}…${value.key.slice(-8)}`
      : value.key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.title}
        </h2>
        {value.verified ? (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={20}
            aria-label="Verified"
          />
        ) : (
          <LucideReact.XCircle
            className="text-red-500"
            size={20}
            aria-label="Unverified"
          />
        )}
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2 text-gray-700 divide-y divide-gray-200">
        <div className="flex items-center py-2">
          <LucideReact.Calendar className="mr-2 text-gray-400" size={16} />
          <span className="text-sm">Created: {formattedCreatedAt}</span>
        </div>

        <div className="flex items-center py-2">
          <LucideReact.Clock className="mr-2 text-gray-400" size={16} />
          <span className="text-sm">Last Used: {formattedLastUsed}</span>
        </div>

        <div className="flex items-center py-2">
          <LucideReact.User className="mr-2 text-gray-400" size={16} />
          <span className="text-sm">Added By: {displayAddedBy}</span>
        </div>

        <div className="flex items-center py-2">
          <LucideReact.Key className="mr-2 text-gray-400" size={16} />
          <code className="text-sm font-mono break-all">{maskedKey}</code>
        </div>

        <div className="flex items-center py-2">
          <LucideReact.Lock className="mr-2 text-gray-400" size={16} />
          <span className="text-sm">
            {value.read_only ? "Read-Only" : "Read/Write"}
          </span>
        </div>

        {typeof value.enabled === "boolean" && (
          <div className="flex items-center py-2">
            {value.enabled ? (
              <LucideReact.CheckCircle
                className="mr-2 text-green-500"
                size={16}
                aria-label="Enabled"
              />
            ) : (
              <LucideReact.XCircle
                className="mr-2 text-red-500"
                size={16}
                aria-label="Disabled"
              />
            )}
            <span className="text-sm">{value.enabled ? "Enabled" : "Disabled"}</span>
          </div>
        )}

        <div className="flex items-center py-2">
          <LucideReact.Link className="mr-2 text-gray-400" size={16} />
          <a
            href={value.url}
            className="text-sm text-blue-600 hover:underline break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value.url}
          </a>
        </div>
      </div>
    </div>
  );
}
