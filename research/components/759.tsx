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
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();

  const statusBadge = value.active
    ? (
      <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
        Active
      </span>
    )
    : (
      <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
        Inactive
      </span>
    );

  const eventBadges = value.events.map((evt, idx) => (
    <span
      key={idx}
      className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-1 mb-1 px-2 py-0.5 rounded"
    >
      {evt}
    </span>
  ));

  const { code, status, message } = value.last_response;
  const hasLastResponse = code !== null || status !== null || message !== null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 truncate">{value.name}</h2>
        {statusBadge}
      </div>

      {/* Events */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Events</h3>
        <div className="flex flex-wrap">{eventBadges}</div>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-700 mb-4">
        <div>
          <div className="font-medium text-gray-800">Target URL</div>
          <div className="truncate">{value.config.url ?? "N/A"}</div>
        </div>
        <div>
          <div className="font-medium text-gray-800">Content Type</div>
          <div>{value.config.content_type ?? "N/A"}</div>
        </div>
        <div>
          <div className="font-medium text-gray-800">Insecure SSL</div>
          <div>{value.config.insecure_ssl != null ? String(value.config.insecure_ssl) : "N/A"}</div>
        </div>
      </div>

      {/* Timestamps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-500 mb-4">
        <div>
          <div>Created</div>
          <div>{createdAt}</div>
        </div>
        <div>
          <div>Last Updated</div>
          <div>{updatedAt}</div>
        </div>
      </div>

      {/* Last Response */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Last Response</h3>
        <div className="p-3 bg-gray-50 rounded text-sm text-gray-700">
          {hasLastResponse ? (
            <>
              <div className="mb-1">
                <span className="font-medium">Code: </span>
                {code ?? "-"}
              </div>
              <div className="mb-1">
                <span className="font-medium">Status: </span>
                {status ?? "-"}
              </div>
              {message && (
                <div className="truncate">
                  <span className="font-medium">Message: </span>
                  {message}
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-500">No recent response</div>
          )}
        </div>
      </div>
    </div>
  );
}
