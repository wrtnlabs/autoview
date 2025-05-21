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
  const { url, content_type, secret, insecure_ssl } = value;

  // Mask all but the last 4 characters of the secret
  const maskedSecret =
    secret?.replace(/.(?=.{4})/g, "•") ?? "";

  // Interpret insecure_ssl: '0' or 0 means verification enabled; '1' or 1 means disabled
  const sslEnabled = insecure_ssl === "0" || insecure_ssl === 0;
  const sslLabel = sslEnabled
    ? "SSL Verification Enabled"
    : "SSL Verification Disabled";
  const sslColor = sslEnabled
    ? "text-green-600 bg-green-100"
    : "text-red-600 bg-red-100";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Webhook Configuration
      </h2>
      <dl className="space-y-4">
        {url && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Delivery URL</dt>
            <dd className="mt-1 text-base text-blue-600 break-all">
              {url}
            </dd>
          </div>
        )}
        {content_type && (
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Content Type
            </dt>
            <dd className="mt-1 text-base text-gray-900">
              {content_type}
            </dd>
          </div>
        )}
        {typeof insecure_ssl !== "undefined" && (
          <div>
            <dt className="text-sm font-medium text-gray-500">
              SSL Verification
            </dt>
            <dd
              className={`mt-1 inline-block px-2 py-0.5 text-sm font-medium rounded ${sslColor}`}
            >
              {sslLabel}
            </dd>
          </div>
        )}
        {secret && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Secret</dt>
            <dd className="mt-1 text-base font-mono text-gray-900">
              {maskedSecret}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
