import React from "react";
export namespace AutoViewInputSubTypes {
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
}
export type AutoViewInput = AutoViewInputSubTypes.webhook_config;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const insecureSSLEnabled =
    value.insecure_ssl === "1" || value.insecure_ssl === 1;
  const sslStatus = insecureSSLEnabled ? "Disabled" : "Enabled";
  const sslStatusColor = insecureSSLEnabled
    ? "text-red-600"
    : "text-green-600";
  const hasSecret = Boolean(value.secret);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Webhook Configuration
      </h2>
      <dl className="space-y-3">
        {value.url && (
          <div>
            <dt className="text-sm font-medium text-gray-500">URL</dt>
            <dd className="mt-1 text-sm text-blue-600 break-all">
              {value.url}
            </dd>
          </div>
        )}
        {value.content_type && (
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Content Type
            </dt>
            <dd className="mt-1 text-sm text-gray-700 capitalize">
              {value.content_type}
            </dd>
          </div>
        )}
        <div>
          <dt className="text-sm font-medium text-gray-500">
            SSL Verification
          </dt>
          <dd className={`mt-1 text-sm font-medium ${sslStatusColor}`}>
            {sslStatus}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Secret</dt>
          <dd className="mt-1 text-sm text-gray-700">
            {hasSecret ? "Configured" : "Not Configured"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
