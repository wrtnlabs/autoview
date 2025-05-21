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
  // 1. Define data aggregation/transformation functions or derived constants
  const { url, content_type, secret, insecure_ssl } = value;

  // Prepare display values with sensible defaults and masking
  const displayUrl = url ?? "Not configured";
  const displayContentType = content_type ?? "Not configured";
  const displaySecret = secret
    ? secret.length > 4
      ? `••••••${secret.slice(-4)}`
      : "••••••••"
    : "Not configured";

  const isInsecureEnabled = insecure_ssl === "1" || insecure_ssl === 1;
  const isInsecureDisabled = insecure_ssl === "0" || insecure_ssl === 0;
  const displayInsecureSsl = isInsecureEnabled
    ? "Enabled"
    : isInsecureDisabled
    ? "Disabled"
    : "Not configured";

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-5 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">
          Webhook Configuration
        </h2>
      </div>
      <div className="px-4 py-5">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">URL</dt>
            <dd className="mt-1 text-sm text-gray-900 break-all">
              {displayUrl}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Content Type
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {displayContentType}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Secret</dt>
            <dd className="mt-1 text-sm text-gray-900 font-mono">
              {displaySecret}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Insecure SSL
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {displayInsecureSsl}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
