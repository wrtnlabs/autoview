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
  const createdDate = new Date(value.created_at).toLocaleString();
  const updatedDate = new Date(value.updated_at).toLocaleString();
  const payloadUrl = value.config.url ?? value.url;
  const hasEvents = Array.isArray(value.events) && value.events.length > 0;
  const hasResponse = value.last_response.code !== null;

  let responseIcon: JSX.Element | null = null;
  let responseText = "";
  if (hasResponse) {
    const code = value.last_response.code as number;
    const status = value.last_response.status ?? "";
    const message = value.last_response.message ? ` - ${value.last_response.message}` : "";
    responseText = `${code} ${status}${message}`.trim();
    if (code >= 200 && code < 300) {
      responseIcon = (
        <LucideReact.CheckCircle
          className="text-green-500"
          size={16}
          strokeWidth={2}
          aria-label="Successful response"
        />
      );
    } else {
      responseIcon = (
        <LucideReact.AlertTriangle
          className="text-red-500"
          size={16}
          strokeWidth={2}
          aria-label="Error response"
        />
      );
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 capitalize">
          {value.name} Hook
        </h2>
        {value.active ? (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={20}
            strokeWidth={2}
            aria-label="Active"
          />
        ) : (
          <LucideReact.XCircle
            className="text-red-500"
            size={20}
            strokeWidth={2}
            aria-label="Inactive"
          />
        )}
      </div>

      <div className="mt-2 text-sm text-gray-600 space-y-1">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Updated: {updatedDate}</span>
        </div>
      </div>

      {hasEvents && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Events</h3>
          <ul className="flex flex-wrap gap-2 mt-1">
            {value.events.map((ev) => (
              <li
                key={ev}
                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
              >
                {ev}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700">Payload URL</h3>
        <div className="flex items-center gap-1 mt-1 text-sm text-blue-600 break-all">
          <LucideReact.Link size={16} className="text-gray-400" />
          <a
            href={payloadUrl}
            className="truncate"
            target="_blank"
            rel="noopener noreferrer"
          >
            {payloadUrl}
          </a>
        </div>
      </div>

      {value.config.content_type && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Content Type</h3>
          <p className="mt-1 text-sm text-gray-600">
            {value.config.content_type}
          </p>
        </div>
      )}

      {hasResponse && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Last Response</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-700">
            {responseIcon}
            <span>{responseText}</span>
          </div>
        </div>
      )}
    </div>
  );
}
