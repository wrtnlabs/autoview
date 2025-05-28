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
export type AutoViewInput = AutoViewInputSubTypes.hook;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const isLastResponseSuccess =
    value.last_response.code !== null &&
    value.last_response.code >= 200 &&
    value.last_response.code < 300;

  // insecure_ssl is defined as string|number when present
  const rawInsecure = value.config.insecure_ssl;
  const isInsecureSSL =
    rawInsecure !== undefined && (rawInsecure === '1' || rawInsecure === 1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      {/* Header: Name + Active Status */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{value.name}</h2>
        {value.active ? (
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
      </div>

      {/* Events Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {value.events.map((event) => (
          <span
            key={event}
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
          >
            {event}
          </span>
        ))}
      </div>

      {/* URLs */}
      <div className="mb-4 space-y-2">
        {[value.url, value.test_url, value.ping_url, value.deliveries_url]
          .filter(Boolean)
          .map((link, idx) => (
            <div
              key={idx}
              className="flex items-center text-sm text-gray-600 overflow-hidden"
            >
              <LucideReact.Link size={16} className="mr-1 flex-shrink-0" />
              <span className="truncate">{link}</span>
            </div>
          ))}
      </div>

      {/* Creation & Update Dates */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.Calendar size={16} className="mr-1 flex-shrink-0" />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.Calendar size={16} className="mr-1 flex-shrink-0" />
          <span>Updated: {updatedAt}</span>
        </div>
      </div>

      {/* Last Response */}
      <div className="mb-4">
        <div className="flex items-center mb-1">
          {isLastResponseSuccess ? (
            <LucideReact.CheckCircle
              className="text-green-500 mr-1"
              size={16}
              aria-label="Last response successful"
            />
          ) : (
            <LucideReact.AlertTriangle
              className="text-red-500 mr-1"
              size={16}
              aria-label="Last response error"
            />
          )}
          <span className="text-sm font-medium">Last Response</span>
        </div>
        <div className="ml-6 text-sm text-gray-700 space-y-1">
          <div>Status: {value.last_response.status ?? 'N/A'}</div>
          <div>Code: {value.last_response.code ?? 'N/A'}</div>
          {value.last_response.message && (
            <div>Message: {value.last_response.message}</div>
          )}
        </div>
      </div>

      {/* Config Summary */}
      <div className="space-y-2">
        {value.config.content_type && (
          <div className="flex items-center text-sm text-gray-600">
            <LucideReact.Tag size={16} className="mr-1 flex-shrink-0" />
            <span>Content Type: {value.config.content_type}</span>
          </div>
        )}
        {rawInsecure !== undefined && (
          <div className="flex items-center text-sm text-gray-600">
            <LucideReact.ShieldOff
              size={16}
              className="mr-1 flex-shrink-0"
            />
            <span>Insecure SSL: {isInsecureSSL ? 'Yes' : 'No'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
