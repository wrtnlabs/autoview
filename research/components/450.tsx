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
export type AutoViewInput = AutoViewInputSubTypes.org_hook[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation / transformation
  const hooks = value;
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Handle empty state
  if (!hooks || hooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 py-8">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No webhooks configured.</span>
      </div>
    );
  }

  // 3. Compose visual structure
  return (
    <div className="space-y-4">
      {hooks.map((hook) => (
        <article
          key={hook.id}
          className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
        >
          <header className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {hook.name}
            </h3>
            {hook.active ? (
              <LucideReact.CheckCircle
                size={20}
                className="text-green-500"
                aria-label="Active"
              />
            ) : (
              <LucideReact.XCircle
                size={20}
                className="text-red-500"
                aria-label="Inactive"
              />
            )}
          </header>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-700 gap-1">
              <LucideReact.Link size={16} />
              <a
                href={hook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-blue-600 hover:underline"
              >
                {hook.url}
              </a>
            </div>

            <div className="flex items-center text-sm text-gray-700 gap-1">
              <LucideReact.Link size={16} />
              <a
                href={hook.ping_url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-blue-600 hover:underline"
              >
                Ping URL
              </a>
            </div>

            {hook.deliveries_url && (
              <div className="flex items-center text-sm text-gray-700 gap-1">
                <LucideReact.Link size={16} />
                <a
                  href={hook.deliveries_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-blue-600 hover:underline"
                >
                  Deliveries
                </a>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              {hook.events.map((evt) => (
                <span
                  key={evt}
                  className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                >
                  {evt}
                </span>
              ))}
            </div>

            <div className="flex items-center text-sm text-gray-600 gap-1 mt-2">
              <LucideReact.Tag size={16} className="text-gray-500" />
              <span className="capitalize">{hook.type}</span>
            </div>

            <div className="flex flex-wrap items-center text-xs text-gray-500 gap-4 mt-3">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={14} />
                <span>Created: {formatDate(hook.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={14} />
                <span>Updated: {formatDate(hook.updated_at)}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
