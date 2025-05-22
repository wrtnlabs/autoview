import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Org Hook
   *
   * @title Org Hook
   */
  export type org_hook = {
    id: number & tags.Type<"int32">;
    url: string & tags.Format<"uri">;
    ping_url: string & tags.Format<"uri">;
    deliveries_url?: string & tags.Format<"uri">;
    name: string;
    events: string[];
    active: boolean;
    config: {
      url?: string;
      insecure_ssl?: string;
      content_type?: string;
      secret?: string;
    };
    updated_at: string & tags.Format<"date-time">;
    created_at: string & tags.Format<"date-time">;
    type: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.org_hook;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const updatedDate = new Date(value.updated_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Hook Name & Status */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        {value.active ? (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={20}
            aria-label="Active"
          />
        ) : (
          <LucideReact.XCircle
            className="text-red-500"
            size={20}
            aria-label="Inactive"
          />
        )}
      </div>

      {/* Body: Key Details */}
      <div className="space-y-3 text-sm text-gray-700">
        {/* Hook Type */}
        <div className="flex items-center">
          <LucideReact.Tag size={16} className="mr-1 text-gray-500" />
          <span className="capitalize">{value.type}</span>
        </div>

        {/* Primary URL */}
        <div className="flex items-center">
          <LucideReact.Link size={16} className="mr-1 text-gray-500" />
          <span className="truncate">{value.url}</span>
        </div>

        {/* Ping URL */}
        <div className="flex items-center">
          <LucideReact.Link size={16} className="mr-1 text-gray-500" />
          <span className="truncate">{value.ping_url}</span>
        </div>

        {/* Deliveries URL (optional) */}
        {value.deliveries_url && (
          <div className="flex items-center">
            <LucideReact.Link size={16} className="mr-1 text-gray-500" />
            <span className="truncate">{value.deliveries_url}</span>
          </div>
        )}

        {/* Events */}
        <div>
          <div className="flex items-center">
            <LucideReact.List size={16} className="mr-1 text-gray-500" />
            <span>Events:</span>
          </div>
          <div className="mt-1 flex flex-wrap gap-2">
            {value.events.map((evt, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded"
              >
                {evt}
              </span>
            ))}
          </div>
        </div>

        {/* Created & Updated Timestamps */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1 text-gray-500" />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1 text-gray-500" />
          <span>Updated: {updatedDate}</span>
        </div>
      </div>
    </div>
  );
}
