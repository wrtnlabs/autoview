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
export type AutoViewInput = AutoViewInputSubTypes.hook[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const hooks = value;

  return (
    <div className="space-y-4">
      {hooks.map((hook) => {
        const createdAt = formatDate(hook.created_at);
        const updatedAt = formatDate(hook.updated_at);
        const isSuccessResponse =
          hook.last_response.code !== null &&
          hook.last_response.code >= 200 &&
          hook.last_response.code < 300;
        const hasResponse =
          hook.last_response.status !== null && hook.last_response.code !== null;
        const responseText = hasResponse
          ? `${hook.last_response.status} (${hook.last_response.code})`
          : 'No Response';

        return (
          <div
            key={hook.id}
            className="p-4 bg-white rounded-lg shadow border border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {hook.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1 capitalize">
                  {hook.type}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  hook.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {hook.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center">
              {hook.events.map((evt) => (
                <span
                  key={evt}
                  className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-2 px-2 py-0.5 rounded"
                >
                  {evt}
                </span>
              ))}
            </div>

            {hook.config.url && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">Target URL:</p>
                <p className="text-sm text-gray-500 truncate">{hook.config.url}</p>
              </div>
            )}

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-700">Created:</p>
                <p>{createdAt}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Updated:</p>
                <p>{updatedAt}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center text-sm">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full mr-2 text-xs font-medium ${
                  hasResponse
                    ? isSuccessResponse
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {hasResponse
                  ? isSuccessResponse
                    ? 'Success'
                    : 'Error'
                  : 'No Response'}
              </span>
              <p className="text-gray-600">{responseText}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
