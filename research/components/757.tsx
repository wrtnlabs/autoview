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
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const isSslDisabled =
    value.config.insecure_ssl === "1" || value.config.insecure_ssl === 1;
  const activeIcon = value.active ? (
    <LucideReact.CheckCircle
      size={16}
      className="text-green-500"
      aria-label="Active"
    />
  ) : (
    <LucideReact.XCircle
      size={16}
      className="text-red-500"
      aria-label="Inactive"
    />
  );
  const lastCode = value.last_response.code;
  const lastResponseIcon =
    lastCode == null ? (
      <LucideReact.Clock
        size={16}
        className="text-amber-500"
        aria-label="No Response"
      />
    ) : lastCode >= 200 && lastCode < 300 ? (
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
    );
  const lastResponseText = value.last_response.status ?? "No response";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-4 max-w-md">
      {/* Header: Webhook name and status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          <LucideReact.Rss
            size={20}
            className="inline-block text-blue-500 mr-2"
          />
          {value.name}
        </h2>
        <div className="flex items-center gap-1">
          {activeIcon}
          <span className="text-sm text-gray-600">
            {value.active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Event triggers */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-1">Events</h3>
        <div className="flex flex-wrap gap-1">
          {value.events.map((evt, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {evt}
            </span>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-700">Configuration</h3>
        <div className="flex items-center gap-1 text-gray-600 text-sm break-all">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span>{value.config.url ?? "—"}</span>
        </div>
        {value.config.content_type && (
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <LucideReact.Tag size={16} className="text-gray-400" />
            <span>{value.config.content_type}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-sm">
          {isSslDisabled ? (
            <LucideReact.ShieldOff size={16} className="text-red-500" />
          ) : (
            <LucideReact.Shield size={16} className="text-green-500" />
          )}
          <span className="text-gray-600">
            SSL Verification {isSslDisabled ? "Disabled" : "Enabled"}
          </span>
        </div>
      </div>

      {/* Timestamps */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Updated: {updatedAt}</span>
        </div>
      </div>

      {/* Last Response */}
      <div className="flex items-center gap-2 bg-gray-50 p-2 rounded text-sm text-gray-700">
        {lastResponseIcon}
        <span>{lastResponseText}</span>
        {lastCode != null && <span className="font-mono">({lastCode})</span>}
      </div>
    </div>
  );
}
