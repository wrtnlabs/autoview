import { tags } from "typia";
import React from "react";
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
  // 1. Derived constants for formatting
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const activeLabel = value.active ? "Active" : "Inactive";
  const activeBadgeColor = value.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  // 2. Extract non-sensitive config fields
  const { url: configUrl, content_type, insecure_ssl } = value.config;

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Name and Active Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{value.name}</h2>
        <span className={`px-2 py-1 text-xs font-medium rounded ${activeBadgeColor}`}>
          {activeLabel}
        </span>
      </div>

      {/* Type */}
      <p className="text-sm text-gray-500 mb-4">Type: <span className="text-gray-700">{value.type}</span></p>

      {/* Events */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-1">Subscribed Events</h3>
        <div className="flex flex-wrap gap-2">
          {value.events.map((evt) => (
            <span key={evt} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {evt}
            </span>
          ))}
        </div>
      </div>

      {/* Creation & Update Timestamps */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <h3 className="font-medium text-gray-700">Created At</h3>
          <p className="text-gray-500">{createdAt}</p>
        </div>
        <div>
          <h3 className="font-medium text-gray-700">Updated At</h3>
          <p className="text-gray-500">{updatedAt}</p>
        </div>
      </div>

      {/* Configuration */}
      {(configUrl || content_type || insecure_ssl != null) && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Configuration</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm text-gray-800">
            {configUrl && (
              <>
                <dt className="font-medium">Payload URL</dt>
                <dd className="break-all">{configUrl}</dd>
              </>
            )}
            {content_type && (
              <>
                <dt className="font-medium">Content Type</dt>
                <dd>{content_type}</dd>
              </>
            )}
            {insecure_ssl != null && (
              <>
                <dt className="font-medium">Insecure SSL</dt>
                <dd>{String(insecure_ssl)}</dd>
              </>
            )}
          </dl>
        </div>
      )}

      {/* Endpoints */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Endpoints</h3>
        <ul className="text-sm text-gray-800 space-y-1">
          <li>
            <span className="font-medium">Primary:</span>{" "}
            <span className="break-all text-blue-600">{value.url}</span>
          </li>
          <li>
            <span className="font-medium">Test:</span>{" "}
            <span className="break-all text-blue-600">{value.test_url}</span>
          </li>
          <li>
            <span className="font-medium">Ping:</span>{" "}
            <span className="break-all text-blue-600">{value.ping_url}</span>
          </li>
          {value.deliveries_url && (
            <li>
              <span className="font-medium">Deliveries:</span>{" "}
              <span className="break-all text-blue-600">{value.deliveries_url}</span>
            </li>
          )}
        </ul>
      </div>

      {/* Last Response */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Last Response</h3>
        <div className="bg-gray-50 p-3 rounded text-sm text-gray-800 space-y-1">
          {value.last_response.code != null && (
            <p>
              <span className="font-medium">Code:</span> {value.last_response.code}
            </p>
          )}
          {value.last_response.status && (
            <p>
              <span className="font-medium">Status:</span> {value.last_response.status}
            </p>
          )}
          {value.last_response.message && (
            <p>
              <span className="font-medium">Message:</span> {value.last_response.message}
            </p>
          )}
          {value.last_response.code == null &&
            !value.last_response.status &&
            !value.last_response.message && (
              <p className="text-gray-500">No response data available.</p>
            )}
        </div>
      </div>
    </div>
  );
}
