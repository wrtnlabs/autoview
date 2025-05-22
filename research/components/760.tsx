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
  const displayUrl = value.url ?? null;
  const contentType = value.content_type?.toLowerCase() ?? 'form';
  const hasSecret = Boolean(value.secret);
  const maskedSecret = hasSecret
    ? `${value.secret!.slice(0, 2)}…${value.secret!.slice(-2)}`
    : null;
  const sslFlag = value.insecure_ssl;
  const sslEnabled = sslFlag === undefined || sslFlag === '0' || sslFlag === 0;
  const sslStatus = sslEnabled ? 'Verification Enabled' : 'Verification Disabled';
  const sslColor = sslEnabled ? 'text-green-600' : 'text-red-600';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Webhook Configuration</h2>
      <div className="space-y-3 text-sm">
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">URL</span>
          {displayUrl ? (
            <span className="text-gray-900 break-words truncate">{displayUrl}</span>
          ) : (
            <span className="text-gray-500 italic">Not configured</span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">Content Type</span>
          <span className="text-gray-900 capitalize">{contentType}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">Secret</span>
          {hasSecret ? (
            <span className="text-gray-900 font-mono">{maskedSecret}</span>
          ) : (
            <span className="text-gray-500 italic">Not configured</span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">SSL Verification</span>
          <span className={`font-medium ${sslColor}`}>{sslStatus}</span>
        </div>
      </div>
    </div>
  );
}
