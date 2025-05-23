import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Org Hook
     *
     * @title Org Hook
    */
    export interface org_hook {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.org_hook;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const insecureSslLabel =
    value.config.insecure_ssl === "1" ? "Allowed" : "Strict";
  const hasConfigDetails =
    value.config.url || value.config.insecure_ssl || value.config.content_type;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        {value.active ? (
          <div className="flex items-center text-green-500">
            <LucideReact.CheckCircle size={16} />
            <span className="ml-1 text-sm font-medium">Active</span>
          </div>
        ) : (
          <div className="flex items-center text-red-500">
            <LucideReact.XCircle size={16} />
            <span className="ml-1 text-sm font-medium">Inactive</span>
          </div>
        )}
      </div>

      {/* Type and Events */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
          <LucideReact.Tag size={14} className="mr-1" />
          {value.type}
        </div>
        {value.events.map((evt) => (
          <div
            key={evt}
            className="flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
          >
            <LucideReact.Tag size={14} className="mr-1" />
            {evt}
          </div>
        ))}
      </div>

      {/* URLs */}
      <div className="space-y-2 mb-4 text-sm text-gray-700">
        <div className="flex items-center gap-1 truncate">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate">{value.url}</span>
        </div>
        <div className="flex items-center gap-1 truncate">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate">{value.ping_url}</span>
        </div>
        {value.deliveries_url && (
          <div className="flex items-center gap-1 truncate">
            <LucideReact.Link size={16} className="text-gray-400" />
            <span className="truncate">{value.deliveries_url}</span>
          </div>
        )}
      </div>

      {/* Config Details */}
      {hasConfigDetails && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md text-sm text-gray-700 space-y-1">
          {value.config.url && (
            <div className="flex items-center gap-1">
              <LucideReact.Link size={16} className="text-gray-400" />
              <span>Config URL: {value.config.url}</span>
            </div>
          )}
          {value.config.content_type && (
            <div className="flex items-center gap-1">
              <LucideReact.FileText size={16} className="text-gray-400" />
              <span>Content Type: {value.config.content_type}</span>
            </div>
          )}
          {value.config.insecure_ssl !== undefined && (
            <div className="flex items-center gap-1">
              <LucideReact.ShieldOff size={16} className="text-gray-400" />
              <span>Insecure SSL: {insecureSslLabel}</span>
            </div>
          )}
        </div>
      )}

      {/* Timestamps */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={14} />
          <span className="ml-1">Created: {createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={14} />
          <span className="ml-1">Updated: {updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
