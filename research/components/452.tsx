import LucideReact from "lucide-react";
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
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const endpoint = value.config.url ?? "N/A";
  const events = value.events || [];
  const isInsecure = value.config.insecure_ssl === "1";
  const contentType = value.config.content_type ?? "default";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div className="flex items-center gap-2">
          <LucideReact.Link size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.name}
          </h2>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center text-sm font-medium">
          {value.active ? (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
              aria-label="Active"
            />
          ) : (
            <LucideReact.XCircle
              size={16}
              className="text-red-500"
              aria-label="Inactive"
            />
          )}
          <span className="ml-1 text-gray-700">
            {value.active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-600">
        {/* Webhook Type */}
        <div className="flex items-center">
          <LucideReact.Server size={16} className="text-gray-400 mr-1" />
          <span className="font-medium text-gray-700">Type:</span>
          <span className="ml-1 capitalize">{value.type}</span>
        </div>

        {/* Endpoint */}
        <div className="flex items-start">
          <LucideReact.Link size={16} className="text-gray-400 mr-1 mt-1" />
          <div>
            <span className="font-medium text-gray-700">Endpoint:</span>
            {endpoint !== "N/A" ? (
              <a
                href={endpoint}
                className="ml-1 block text-blue-600 hover:underline break-all"
              >
                {endpoint}
              </a>
            ) : (
              <span className="ml-1 text-gray-500">N/A</span>
            )}
          </div>
        </div>

        {/* Ping URL */}
        {value.ping_url && (
          <div className="flex items-start">
            <LucideReact.Activity
              size={16}
              className="text-gray-400 mr-1 mt-1"
            />
            <div>
              <span className="font-medium text-gray-700">Ping URL:</span>
              <a
                href={value.ping_url}
                className="ml-1 block text-blue-600 hover:underline break-all"
              >
                {value.ping_url}
              </a>
            </div>
          </div>
        )}

        {/* Deliveries URL */}
        {value.deliveries_url && (
          <div className="flex items-start">
            <LucideReact.List size={16} className="text-gray-400 mr-1 mt-1" />
            <div>
              <span className="font-medium text-gray-700">Deliveries:</span>
              <a
                href={value.deliveries_url}
                className="ml-1 block text-blue-600 hover:underline break-all"
              >
                {value.deliveries_url}
              </a>
            </div>
          </div>
        )}

        {/* Content Type */}
        <div className="flex items-center">
          <LucideReact.Settings size={16} className="text-gray-400 mr-1" />
          <span className="font-medium text-gray-700">Content Type:</span>
          <span className="ml-1 capitalize">{contentType}</span>
        </div>

        {/* SSL Warning */}
        {isInsecure && (
          <div className="flex items-center col-span-full">
            <LucideReact.AlertTriangle
              size={16}
              className="text-amber-500 mr-1"
              aria-label="Insecure SSL"
            />
            <span className="text-amber-700 text-sm">
              SSL verification disabled
            </span>
          </div>
        )}

        {/* Created At */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
          <span className="font-medium text-gray-700">Created:</span>
          <time className="ml-1">{createdAt}</time>
        </div>

        {/* Updated At */}
        <div className="flex items-center">
          <LucideReact.RefreshCw size={16} className="text-gray-400 mr-1" />
          <span className="font-medium text-gray-700">Updated:</span>
          <time className="ml-1">{updatedAt}</time>
        </div>
      </div>

      {/* Events List */}
      {events.length > 0 && (
        <div className="mt-5">
          <span className="text-sm font-medium text-gray-700">Events:</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {events.map((evt) => (
              <span
                key={evt}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
              >
                {evt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
