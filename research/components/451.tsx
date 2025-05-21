import { tags } from "typia";
import React from "react";
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
  const isActive = value.active;
  const statusLabel = isActive ? "Active" : "Inactive";
  const statusColor = isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
        <span className={`px-2 py-1 text-sm font-medium rounded ${statusColor}`}>{statusLabel}</span>
      </div>

      {/* Type */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase">Hook Type</h3>
        <p className="text-gray-700 mt-1 truncate">{value.type}</p>
      </div>

      {/* Events */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase">Events</h3>
        <div className="mt-1 flex flex-wrap gap-1">
          {value.events.map((evt, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full truncate"
            >
              {evt}
            </span>
          ))}
        </div>
      </div>

      {/* URLs */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase">Endpoints</h3>
        <div className="mt-1 space-y-2">
          <div>
            <p className="text-[10px] text-gray-400">URL</p>
            <p className="text-sm text-gray-700 break-all">{value.url}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400">Ping URL</p>
            <p className="text-sm text-gray-700 break-all">{value.ping_url}</p>
          </div>
          {value.deliveries_url && (
            <div>
              <p className="text-[10px] text-gray-400">Deliveries URL</p>
              <p className="text-sm text-gray-700 break-all">{value.deliveries_url}</p>
            </div>
          )}
        </div>
      </div>

      {/* Config */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase">Configuration</h3>
        <div className="mt-1 space-y-1 text-gray-700 text-sm">
          {value.config.content_type && (
            <p>
              <span className="font-medium">Content Type:</span> {value.config.content_type}
            </p>
          )}
          {value.config.url && (
            <p>
              <span className="font-medium">Config URL:</span> {value.config.url}
            </p>
          )}
          {typeof value.config.insecure_ssl === "string" && (
            <p>
              <span className="font-medium">Insecure SSL:</span>{" "}
              {value.config.insecure_ssl === "1" ? "Enabled" : "Disabled"}
            </p>
          )}
        </div>
      </div>

      {/* Timestamps */}
      <div className="grid grid-cols-2 gap-4 text-gray-600 text-xs">
        <div>
          <p className="font-medium">Created At</p>
          <p className="mt-0.5">{createdAt}</p>
        </div>
        <div>
          <p className="font-medium">Updated At</p>
          <p className="mt-0.5">{updatedAt}</p>
        </div>
      </div>
    </div>
  );
}
