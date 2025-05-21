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
export type AutoViewInput = AutoViewInputSubTypes.org_hook[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper: format ISO date-time string into "Jan 1, 2023, 03:45 PM"
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {value.length === 0 ? (
        <p className="text-center text-gray-500">No webhooks configured.</p>
      ) : (
        value.map((hook) => (
          <div
            key={hook.id}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Left section: hook details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {hook.name || "(Unnamed Hook)"}
              </h3>
              <p className="mt-1 text-sm text-gray-500 truncate">{hook.type}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {hook.events.map((evt, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                  >
                    {evt}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-sm text-gray-700">
                <span className="font-medium">Endpoint:</span>{" "}
                <span className="font-mono truncate block">{hook.url}</span>
              </p>
            </div>

            {/* Right section: status and timestamps */}
            <div className="mt-4 sm:mt-0 flex flex-col sm:items-end sm:space-y-1">
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                  hook.active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {hook.active ? "Active" : "Inactive"}
              </span>
              <p className="text-xs text-gray-500">
                Created: {formatDate(hook.created_at)}
              </p>
              <p className="text-xs text-gray-500">
                Updated: {formatDate(hook.updated_at)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
