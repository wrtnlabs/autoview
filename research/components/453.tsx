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
  // 1. Define data aggregation/transformation functions or derived constants
  const formattedCreated = new Date(value.created_at).toLocaleString(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );
  const formattedUpdated = new Date(value.updated_at).toLocaleString(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );
  const sslEnabled = value.config.insecure_ssl !== "1";

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <LucideReact.Rss className="text-gray-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold text-gray-800">{value.name}</h2>
        </div>
        {value.active ? (
          <div className="flex items-center text-green-600 text-sm">
            <LucideReact.CheckCircle className="mr-1" size={16} />
            Active
          </div>
        ) : (
          <div className="flex items-center text-red-600 text-sm">
            <LucideReact.XCircle className="mr-1" size={16} />
            Inactive
          </div>
        )}
      </div>

      {/* Hook Type */}
      <div className="text-sm text-gray-500 mb-4">{value.type}</div>

      {/* Events */}
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-700">
          Subscribed Events:
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {value.events.map((evt) => (
            <span
              key={evt}
              className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {evt}
            </span>
          ))}
        </div>
      </div>

      {/* Configuration Section */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          {/* Callback URL */}
          <div className="flex items-start">
            <LucideReact.Link className="text-gray-500 mr-2 mt-1" size={16} />
            <div>
              <div className="font-medium">Callback URL</div>
              <div className="font-mono break-all">
                {value.config.url ?? "—"}
              </div>
            </div>
          </div>

          {/* Content Type */}
          <div className="flex items-center">
            <LucideReact.FileText className="text-gray-500 mr-2" size={16} />
            <div>
              <div className="font-medium">Content Type</div>
              <div>{value.config.content_type ?? "—"}</div>
            </div>
          </div>

          {/* SSL Verification */}
          <div className="flex items-center">
            {sslEnabled ? (
              <LucideReact.CheckCircle
                className="text-green-500 mr-2"
                size={16}
              />
            ) : (
              <LucideReact.AlertTriangle
                className="text-amber-500 mr-2"
                size={16}
              />
            )}
            <div>
              <div className="font-medium">SSL Verification</div>
              <div>{sslEnabled ? "Enabled" : "Disabled"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* URLs & Timestamps */}
      <div className="border-t border-gray-200 pt-4 mt-4 text-sm text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ping URL */}
          <div className="flex items-start">
            <LucideReact.Link className="text-gray-500 mr-2 mt-1" size={16} />
            <div>
              <div className="font-medium">Ping URL</div>
              <div className="font-mono break-all">{value.ping_url}</div>
            </div>
          </div>

          {/* Deliveries URL (optional) */}
          {value.deliveries_url && (
            <div className="flex items-start">
              <LucideReact.Package
                className="text-gray-500 mr-2 mt-1"
                size={16}
              />
              <div>
                <div className="font-medium">Deliveries URL</div>
                <div className="font-mono break-all">
                  {value.deliveries_url}
                </div>
              </div>
            </div>
          )}

          {/* Created At */}
          <div className="flex items-center">
            <LucideReact.Calendar className="text-gray-500 mr-2" size={16} />
            <div>
              <div className="font-medium">Created</div>
              <div>{formattedCreated}</div>
            </div>
          </div>

          {/* Updated At */}
          <div className="flex items-center">
            <LucideReact.Calendar className="text-gray-500 mr-2" size={16} />
            <div>
              <div className="font-medium">Updated</div>
              <div>{formattedUpdated}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
