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
export type AutoViewInput = AutoViewInputSubTypes.hook;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreated = new Date(value.created_at).toLocaleString();
  const formattedUpdated = new Date(value.updated_at).toLocaleString();
  const eventsList = value.events.join(", ");

  const activeIcon = value.active ? (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  ) : (
    <LucideReact.XCircle className="text-red-500" size={16} />
  );

  const { code, status, message } = value.last_response;
  const responseIcon =
    code === null ? (
      <LucideReact.AlertTriangle className="text-gray-400" size={16} />
    ) : code >= 200 && code < 300 ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : (
      <LucideReact.AlertTriangle className="text-red-500" size={16} />
    );
  const responseStatus = status ?? "—";
  const responseMessage = message ?? "No message";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-md mx-auto">
      {/* Header: name and type */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <div className="flex items-center space-x-1">
          {activeIcon}
          <span
            className={`text-sm ${value.active ? "text-green-600" : "text-red-600"}`}
          >
            {value.active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Basic properties */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <LucideReact.Tag size={16} className="text-gray-400" />
          <span className="truncate">{eventsList || "No events"}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>
            Created: <time dateTime={value.created_at}>{formattedCreated}</time>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>
            Updated: <time dateTime={value.updated_at}>{formattedUpdated}</time>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Code size={16} className="text-gray-400" />
          <span className="uppercase text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
            {value.type}
          </span>
        </div>
      </div>

      {/* Endpoints */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate break-all text-blue-600">{value.url}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate break-all">{value.test_url}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="truncate break-all">{value.ping_url}</span>
        </div>
        {value.deliveries_url && (
          <div className="flex items-center gap-2">
            <LucideReact.Link size={16} className="text-gray-400" />
            <span className="truncate break-all">{value.deliveries_url}</span>
          </div>
        )}
      </div>

      {/* Last response */}
      <div className="border-t pt-3">
        <h3 className="text-sm font-medium text-gray-700">Last Response</h3>
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
          {responseIcon}
          <span>Code: {code === null ? "—" : code}</span>
          <span className="mx-2">&middot;</span>
          <span>Status: {responseStatus}</span>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {responseMessage}
        </p>
      </div>
    </div>
  );
}
