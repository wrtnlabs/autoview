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
  const statusText = value.active ? 'Active' : 'Inactive';
  const statusColor = value.active ? 'green-500' : 'red-500';
  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const updatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const sslDisabled = value.config.insecure_ssl === '1';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {value.name || 'Unnamed Hook'}
        </h2>
        <span
          className={`px-2 py-1 text-sm font-medium text-white bg-${statusColor} rounded-full`}
        >
          {statusText}
        </span>
      </div>

      {/* Core Info */}
      <div className="space-y-2 text-gray-700 text-sm">
        <div>
          <span className="font-medium">Type:</span>{' '}
          <span className="italic">{value.type}</span>
        </div>
        <div>
          <span className="font-medium">Endpoint URL:</span>
          <div className="mt-1 text-blue-600 truncate font-mono">
            {value.url}
          </div>
        </div>
        {value.deliveries_url && (
          <div>
            <span className="font-medium">Deliveries URL:</span>
            <div className="mt-1 text-blue-600 truncate font-mono">
              {value.deliveries_url}
            </div>
          </div>
        )}
        <div>
          <span className="font-medium">Ping URL:</span>
          <div className="mt-1 text-blue-600 truncate font-mono">
            {value.ping_url}
          </div>
        </div>
      </div>

      {/* Events */}
      {value.events.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800 mb-1">Subscribed Events:</h3>
          <div className="flex flex-wrap gap-2">
            {value.events.map((evt, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded-full"
              >
                {evt}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Config Summary */}
      <div className="mt-4 border-t pt-4 text-gray-700 text-sm space-y-2">
        <h3 className="text-sm font-medium text-gray-800">Configuration:</h3>
        {value.config.content_type && (
          <div>
            <span className="font-medium">Content Type:</span> {value.config.content_type}
          </div>
        )}
        {typeof value.config.insecure_ssl !== 'undefined' && (
          <div>
            <span className="font-medium">SSL Verification:</span>{' '}
            {sslDisabled ? 'Disabled' : 'Enabled'}
          </div>
        )}
        {value.config.url && (
          <div>
            <span className="font-medium">Config URL:</span>
            <div className="mt-1 text-blue-600 truncate font-mono">
              {value.config.url}
            </div>
          </div>
        )}
      </div>

      {/* Timestamps */}
      <div className="mt-4 border-t pt-4 text-gray-500 text-xs flex justify-between">
        <div>
          <span className="font-medium">Created:</span> {createdAt}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {updatedAt}
        </div>
      </div>
    </div>
  );
}
