import LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.hook;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreated = new Date(value.created_at).toLocaleString();
  const formattedUpdated = new Date(value.updated_at).toLocaleString();
  const sslEnabled =
    value.config.insecure_ssl === "1" ||
    value.config.insecure_ssl === 1 ||
    value.config.insecure_ssl === "true";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Name, Type, Active Status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {value.name}
          </h2>
          <div className="flex items-center text-sm text-gray-500">
            <LucideReact.Tag size={16} className="mr-1" />
            <span>{value.type}</span>
          </div>
        </div>
        <div>
          {value.active ? (
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
      </div>

      {/* Details Section */}
      <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Created: {formattedCreated}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Updated: {formattedUpdated}</span>
        </div>
        {value.config.url && (
          <div className="flex items-center break-all">
            <LucideReact.Link size={16} className="mr-1 text-gray-400" />
            <span>{value.config.url}</span>
          </div>
        )}
        {value.events.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            <LucideReact.ListChecks size={16} className="text-gray-400 mr-1" />
            {value.events.map((evt, i) => (
              <span
                key={i}
                className="bg-gray-200 text-gray-800 rounded px-2 py-0.5 text-xs"
              >
                {evt}
              </span>
            ))}
          </div>
        )}
        {value.config.content_type && (
          <div className="flex items-center">
            <LucideReact.FileText size={16} className="mr-1 text-gray-400" />
            <span>Content-Type: {value.config.content_type}</span>
          </div>
        )}
        {value.config.insecure_ssl != null && (
          <div className="flex items-center">
            {sslEnabled ? (
              <LucideReact.LockOpen size={16} className="mr-1 text-amber-500" />
            ) : (
              <LucideReact.Lock size={16} className="mr-1 text-green-500" />
            )}
            <span>{sslEnabled ? "Insecure SSL Enabled" : "SSL Verified"}</span>
          </div>
        )}
      </div>

      {/* Last Response Section */}
      <div className="mt-4 border-t pt-4">
        <h3 className="text-sm font-medium text-gray-900 flex items-center">
          <LucideReact.Activity size={16} className="mr-1" />
          Last Response
        </h3>
        <div className="mt-1 text-sm text-gray-600 space-y-1">
          <div className="flex items-center">
            {value.last_response.status === "success" ? (
              <LucideReact.CheckCircle
                className="text-green-500 mr-1"
                size={16}
                aria-label="Success"
              />
            ) : value.last_response.status === "pending" ? (
              <LucideReact.Clock
                className="text-amber-500 mr-1"
                size={16}
                aria-label="Pending"
              />
            ) : (
              <LucideReact.AlertTriangle
                className="text-red-500 mr-1"
                size={16}
                aria-label="Error"
              />
            )}
            <span>Status: {value.last_response.status ?? "Unknown"}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Hash size={16} className="text-gray-400 mr-1" />
            <span>Code: {value.last_response.code ?? "-"}</span>
          </div>
          {value.last_response.message && (
            <div className="flex items-start">
              <LucideReact.MessageCircle
                size={16}
                className="text-gray-400 mr-1 mt-0.5"
              />
              <span className="break-all">{value.last_response.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
