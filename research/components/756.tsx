import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Webhooks for repositories.
   *
   * @title Webhook
   */
  export type hook = {
    type: string;
    /**
     * Unique identifier of the webhook.
     */
    id: number & tags.Type<"int32">;
    /**
     * The name of a valid service, use 'web' for a webhook.
     */
    name: string;
    /**
     * Determines whether the hook is actually triggered on pushes.
     */
    active: boolean;
    /**
     * Determines what events the hook is triggered for. Default: ['push'].
     */
    events: string[];
    config: AutoViewInputSubTypes.webhook_config;
    updated_at: string & tags.Format<"date-time">;
    created_at: string & tags.Format<"date-time">;
    url: string & tags.Format<"uri">;
    test_url: string & tags.Format<"uri">;
    ping_url: string & tags.Format<"uri">;
    deliveries_url?: string & tags.Format<"uri">;
    last_response: AutoViewInputSubTypes.hook_response;
  };
  /**
   * Configuration object of the webhook
   *
   * @title Webhook Configuration
   */
  export type webhook_config = {
    url?: AutoViewInputSubTypes.webhook_config_url;
    content_type?: AutoViewInputSubTypes.webhook_config_content_type;
    secret?: AutoViewInputSubTypes.webhook_config_secret;
    insecure_ssl?: AutoViewInputSubTypes.webhook_config_insecure_ssl;
  };
  /**
   * The URL to which the payloads will be delivered.
   */
  export type webhook_config_url = string;
  /**
   * The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`.
   */
  export type webhook_config_content_type = string;
  /**
   * If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers).
   */
  export type webhook_config_secret = string;
  export type webhook_config_insecure_ssl = string | number;
  /**
   * @title Hook Response
   */
  export type hook_response = {
    code: (number & tags.Type<"int32">) | null;
    status: string | null;
    message: string | null;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.hook[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalHooks = value.length;
  const activeHooks = value.filter((hook) => hook.active).length;
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (totalHooks === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={32} className="text-gray-400" />
        <p className="mt-2 text-sm">No webhooks available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Webhooks ({totalHooks})
        </h2>
        <p className="mt-1 sm:mt-0 text-sm text-gray-600">
          {activeHooks} Active, {totalHooks - activeHooks} Inactive
        </p>
      </div>

      {/* List of Webhook Cards */}
      <ul className="space-y-4 px-4">
        {value.map((hook) => {
          const isSuccess =
            hook.last_response.code !== null &&
            hook.last_response.code >= 200 &&
            hook.last_response.code < 300;
          return (
            <li
              key={hook.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col space-y-3"
            >
              {/* Header: Name and Active Status */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800 truncate">
                  {hook.name}
                </h3>
                {hook.active ? (
                  <div className="flex items-center text-green-600 text-sm">
                    <LucideReact.CheckCircle size={16} />
                    <span className="ml-1">Active</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 text-sm">
                    <LucideReact.XCircle size={16} />
                    <span className="ml-1">Inactive</span>
                  </div>
                )}
              </div>

              {/* Core Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                {/* Hook API URL */}
                <div className="flex items-center gap-1 truncate">
                  <LucideReact.Link size={16} className="text-gray-400" />
                  <a
                    href={hook.url}
                    className="truncate text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {hook.url}
                  </a>
                </div>

                {/* Config Endpoint */}
                {hook.config.url && (
                  <div className="flex items-center gap-1 truncate">
                    <LucideReact.Link size={16} className="text-gray-400" />
                    <span className="truncate">{hook.config.url}</span>
                  </div>
                )}

                {/* Event Triggers */}
                <div className="flex flex-wrap gap-1">
                  {hook.events.map((ev) => (
                    <span
                      key={ev}
                      className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                    >
                      {ev}
                    </span>
                  ))}
                </div>

                {/* Timestamps */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <LucideReact.Calendar size={16} className="text-gray-400" />
                    <span>Created: {formatDate(hook.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.Clock size={16} className="text-gray-400" />
                    <span>Updated: {formatDate(hook.updated_at)}</span>
                  </div>
                </div>
              </div>

              {/* Last Response */}
              <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-700">
                  {isSuccess ? (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500"
                      aria-label="Success"
                    />
                  ) : (
                    <LucideReact.AlertTriangle
                      size={16}
                      className="text-red-500"
                      aria-label="Error"
                    />
                  )}
                  <span>
                    {hook.last_response.status || "No Response"} (
                    {hook.last_response.code ?? "-"})
                  </span>
                </div>
                {hook.last_response.message && (
                  <p className="mt-2 sm:mt-0 text-gray-500 truncate">
                    {hook.last_response.message}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
