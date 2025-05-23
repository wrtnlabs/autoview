import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Webhooks for repositories.
     *
     * @title Webhook
    */
    export interface hook {
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
    }
    /**
     * Configuration object of the webhook
     *
     * @title Webhook Configuration
    */
    export interface webhook_config {
        url?: AutoViewInputSubTypes.webhook_config_url;
        content_type?: AutoViewInputSubTypes.webhook_config_content_type;
        secret?: AutoViewInputSubTypes.webhook_config_secret;
        insecure_ssl?: AutoViewInputSubTypes.webhook_config_insecure_ssl;
    }
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
    export interface hook_response {
        code: (number & tags.Type<"int32">) | null;
        status: string | null;
        message: string | null;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.hook[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const hooks = value;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hooks || hooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No webhooks available.</p>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="space-y-4">
      {hooks.map((hook) => {
        const statusCode = hook.last_response?.code;
        const statusText = hook.last_response?.status ?? "Unknown";
        const isSuccess =
          statusCode != null && statusCode >= 200 && statusCode < 300;

        return (
          <div key={hook.id} className="p-4 bg-white rounded-lg shadow">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {hook.name}
              </h3>
              {hook.active ? (
                <LucideReact.CheckCircle
                  className="text-green-500"
                  size={20}
                  aria-label="Active"
                />
              ) : (
                <LucideReact.XCircle
                  className="text-red-500"
                  size={20}
                  aria-label="Inactive"
                />
              )}
            </div>

            {/* Timestamps */}
            <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600 space-x-2">
              <LucideReact.Calendar size={16} />
              <span>Created: {formatDate(hook.created_at)}</span>
              <span>·</span>
              <span>Updated: {formatDate(hook.updated_at)}</span>
            </div>

            {/* URLs */}
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex items-center space-x-1">
                <LucideReact.Link
                  size={16}
                  className="text-gray-400 flex-shrink-0"
                />
                <span className="truncate">{hook.url}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Link
                  size={16}
                  className="text-gray-400 flex-shrink-0"
                />
                <span className="truncate">{hook.test_url}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Link
                  size={16}
                  className="text-gray-400 flex-shrink-0"
                />
                <span className="truncate">{hook.ping_url}</span>
              </div>
            </div>

            {/* Events */}
            <div className="mt-3">
              <h4 className="text-sm font-medium text-gray-800">Events</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {hook.events.map((evt) => (
                  <span
                    key={evt}
                    className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
                  >
                    {evt}
                  </span>
                ))}
              </div>
            </div>

            {/* Config */}
            {hook.config && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-800">Config</h4>
                <ul className="mt-1 text-sm text-gray-700 space-y-1">
                  {hook.config.url && (
                    <li className="flex items-center space-x-1">
                      <LucideReact.Link
                        size={16}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <span className="truncate">{hook.config.url}</span>
                    </li>
                  )}
                  {hook.config.content_type && (
                    <li className="flex items-center space-x-1">
                      <LucideReact.Tag
                        size={16}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <span>{hook.config.content_type}</span>
                    </li>
                  )}
                  {hook.config.secret && (
                    <li className="flex items-center space-x-1">
                      <LucideReact.Key
                        size={16}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <span className="truncate">••••••••</span>
                    </li>
                  )}
                  {hook.config.insecure_ssl != null && (
                    <li className="flex items-center space-x-1">
                      <LucideReact.ShieldOff
                        size={16}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <span>{hook.config.insecure_ssl}</span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Last Response */}
            <div className="mt-3">
              <h4 className="text-sm font-medium text-gray-800">
                Last Response
              </h4>
              <div className="flex items-center mt-1 space-x-2 text-sm">
                {statusCode != null ? (
                  isSuccess ? (
                    <LucideReact.CheckCircle
                      className="text-green-500 flex-shrink-0"
                      size={16}
                      aria-label="Success"
                    />
                  ) : (
                    <LucideReact.AlertTriangle
                      className="text-red-500 flex-shrink-0"
                      size={16}
                      aria-label="Error"
                    />
                  )
                ) : (
                  <LucideReact.HelpCircle
                    className="text-gray-400 flex-shrink-0"
                    size={16}
                    aria-label="Unknown"
                  />
                )}
                <span>
                  {statusCode ?? "—"} {statusText}
                </span>
              </div>
              {hook.last_response.message && (
                <p className="mt-1 text-xs text-gray-600 truncate">
                  {hook.last_response.message}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
