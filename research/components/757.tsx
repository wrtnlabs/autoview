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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const deliveryUrl = value.config.url ?? value.url;
  const isInsecureSsl =
    value.config.insecure_ssl === '1' || value.config.insecure_ssl === 1;
  const hasLastResponse =
    value.last_response.code !== null || !!value.last_response.status;
  const isSuccessResponse =
    value.last_response.code !== null &&
    value.last_response.code >= 200 &&
    value.last_response.code < 300;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col space-y-4">
      {/* Header: Name and Active Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value.active
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value.active ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Events */}
      {value.events.length > 0 && (
        <div className="flex space-x-2 overflow-x-auto">
          {value.events.map((evt, idx) => (
            <span
              key={idx}
              className="whitespace-nowrap bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {evt}
            </span>
          ))}
        </div>
      )}

      {/* Delivery URL */}
      <div className="text-sm text-gray-700">
        <div className="font-medium text-gray-800">Delivery URL</div>
        <div className="truncate">{deliveryUrl}</div>
      </div>

      {/* Configuration Details */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <div className="font-medium text-gray-800">Content Type</div>
          <div>{value.config.content_type ?? 'form'}</div>
        </div>
        <div>
          <div className="font-medium text-gray-800">Insecure SSL</div>
          <div>{isInsecureSsl ? 'Enabled' : 'Disabled'}</div>
        </div>
      </div>

      {/* Timestamps */}
      <div className="flex flex-wrap text-xs text-gray-500 space-x-4">
        <div>Created: {formattedCreatedAt}</div>
        <div>Updated: {formattedUpdatedAt}</div>
      </div>

      {/* Last Response */}
      {hasLastResponse && (
        <div className="border-t pt-3 mt-3 text-sm text-gray-700">
          <div className="font-medium text-gray-800 mb-1">Last Response</div>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 rounded-full text-white ${
                isSuccessResponse ? 'bg-green-500' : 'bg-red-500'
              } text-xs`}
            >
              {value.last_response.code ?? '-'}
            </span>
            <span className="text-gray-700">
              {value.last_response.status ?? 'No status'}
            </span>
          </div>
          {value.last_response.message && (
            <div className="mt-1 text-gray-600 truncate">
              {value.last_response.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
