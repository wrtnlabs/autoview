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

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
      {/* Header: Name, Type, Active Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <LucideReact.Settings size={20} className="text-gray-600 flex-shrink-0" />
          <div className="flex flex-col overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
            <span className="mt-0.5 inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded truncate">
              {value.type}
            </span>
          </div>
        </div>
        {value.active ? (
          <LucideReact.CheckCircle
            size={20}
            className="text-green-500"
            role="img"
            aria-label="Active"
          />
        ) : (
          <LucideReact.XCircle
            size={20}
            className="text-red-500"
            role="img"
            aria-label="Inactive"
          />
        )}
      </div>

      {/* Timestamps */}
      <div className="flex flex-col text-sm text-gray-500 gap-1">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} aria-hidden />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} aria-hidden />
          <span>Updated: {updatedAt}</span>
        </div>
      </div>

      {/* URLs */}
      <div className="flex flex-col text-sm text-gray-700 gap-1">
        <div className="flex items-start gap-1">
          <LucideReact.Link size={16} className="mt-0.5" aria-hidden />
          <span className="break-all truncate">{value.url}</span>
        </div>
        <div className="flex items-start gap-1">
          <LucideReact.Rss size={16} className="mt-0.5 text-gray-500" aria-hidden />
          <span className="break-all truncate">{value.ping_url}</span>
        </div>
        {value.deliveries_url && (
          <div className="flex items-start gap-1">
            <LucideReact.ArrowRightCircle
              size={16}
              className="mt-0.5 text-gray-500"
              aria-hidden
            />
            <span className="break-all truncate">{value.deliveries_url}</span>
          </div>
        )}
      </div>

      {/* Events */}
      {value.events.length > 0 && (
        <div className="flex flex-col text-sm">
          <span className="font-medium text-gray-700 flex items-center gap-1">
            <LucideReact.ListChecks size={16} aria-hidden /> Events
          </span>
          <div className="mt-1 flex flex-wrap gap-1">
            {value.events.map((ev) => (
              <span
                key={ev}
                className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded truncate"
              >
                {ev}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Configuration */}
      <div className="flex flex-col text-sm">
        <span className="font-medium text-gray-700 flex items-center gap-1">
          <LucideReact.Sliders size={16} aria-hidden /> Configuration
        </span>
        <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
          {value.config.content_type && (
            <div className="flex items-center gap-1">
              <span className="font-medium">Content Type:</span>
              <span className="truncate">{value.config.content_type}</span>
            </div>
          )}
          {value.config.insecure_ssl !== undefined && (
            <div className="flex items-center gap-1">
              <span className="font-medium">Insecure SSL:</span>
              <span>{value.config.insecure_ssl}</span>
            </div>
          )}
          {value.config.url && (
            <div className="flex items-start gap-1 col-span-full">
              <span className="font-medium">Webhook URL:</span>
              <span className="break-all text-blue-600 truncate">{value.config.url}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
