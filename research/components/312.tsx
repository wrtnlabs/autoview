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
  const url = value.url ?? "—";
  const contentTypeRaw = value.content_type ?? "form";
  const contentType = contentTypeRaw.charAt(0).toUpperCase() + contentTypeRaw.slice(1).toLowerCase();
  const hasSecret = typeof value.secret === "string" && value.secret.length > 0;
  const maskedSecret = hasSecret
    ? "••••" + value.secret!.slice(-4)
    : "Not configured";
  const insecureRaw = value.insecure_ssl;
  const isInsecure =
    insecureRaw === "1" || insecureRaw === 1 || insecureRaw === "true";
  const sslStatus = isInsecure ? "Disabled" : "Enabled";
  const sslColor = isInsecure ? "text-red-600" : "text-green-600";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Webhook Configuration
      </h3>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-gray-500">URL</dt>
          <dd className="mt-1 text-sm text-gray-900 truncate">{url}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">
            Content Type
          </dt>
          <dd className="mt-1 text-sm text-gray-900">{contentType}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Secret</dt>
          <dd className="mt-1 text-sm text-gray-900">{maskedSecret}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">
            SSL Verification
          </dt>
          <dd className={`mt-1 text-sm font-medium ${sslColor}`}>
            {sslStatus}
          </dd>
        </div>
      </dl>
    </div>
  );
}
