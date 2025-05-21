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
  const {
    name,
    type,
    active,
    events,
    url,
    ping_url,
    deliveries_url,
    created_at,
    updated_at,
  } = value;

  const createdDate = new Date(created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updatedDate = new Date(updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Name and Active Status */}
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={name}
        >
          {name}
        </h2>
        <span
          className={
            active
              ? "px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded"
              : "px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded"
          }
        >
          {active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Type */}
      <p className="mt-1 text-sm text-gray-600">
        <span className="font-medium text-gray-700">Type:</span> {type}
      </p>

      {/* Events List */}
      <div className="mt-3">
        <p className="text-sm text-gray-600 font-medium">Subscribed Events</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {events.map((evt, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
              title={evt}
            >
              {evt}
            </span>
          ))}
        </div>
      </div>

      {/* URLs */}
      <div className="mt-4 space-y-1 text-xs text-gray-500">
        <p>
          <span className="font-medium text-gray-700">URL:</span>{" "}
          <span className="break-all">{url}</span>
        </p>
        <p>
          <span className="font-medium text-gray-700">Ping URL:</span>{" "}
          <span className="break-all">{ping_url}</span>
        </p>
        {deliveries_url && (
          <p>
            <span className="font-medium text-gray-700">Deliveries URL:</span>{" "}
            <span className="break-all">{deliveries_url}</span>
          </p>
        )}
      </div>

      {/* Timestamps */}
      <div className="mt-4 text-xs text-gray-400 space-y-0.5">
        <p>
          <span className="font-medium">Created:</span> {createdDate}
        </p>
        <p>
          <span className="font-medium">Updated:</span> {updatedDate}
        </p>
      </div>
    </div>
  );
}
