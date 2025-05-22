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
  const url = value.url || '';
  const contentType = value.content_type || 'form';
  const insecureSslVal = value.insecure_ssl;
  const insecureSslEnabled = insecureSslVal === '1' || insecureSslVal === 1;
  const maskedSecret = value.secret
    ? `${value.secret.slice(0, 4)}…${value.secret.slice(-4)}`
    : '—';
  const hasAny =
    !!value.url ||
    !!value.content_type ||
    !!value.secret ||
    value.insecure_ssl !== undefined;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasAny) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No webhook configuration provided.
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Webhook Configuration
      </h2>
      <dl className="space-y-3">
        {/* URL */}
        <div>
          <dt className="text-sm font-medium text-gray-500">URL</dt>
          <dd
            className="mt-1 text-sm text-blue-600 truncate"
            title={url}
          >
            {url || '—'}
          </dd>
        </div>
        {/* Content Type */}
        <div className="flex justify-between items-center">
          <dt className="text-sm font-medium text-gray-500">
            Content Type
          </dt>
          <dd className="mt-1 text-sm text-gray-700 capitalize">
            {contentType}
          </dd>
        </div>
        {/* Secret */}
        <div className="flex justify-between items-center">
          <dt className="text-sm font-medium text-gray-500">Secret</dt>
          <dd className="mt-1 text-sm text-gray-700 font-mono">
            {maskedSecret}
          </dd>
        </div>
        {/* Insecure SSL */}
        <div className="flex justify-between items-center">
          <dt className="text-sm font-medium text-gray-500">
            Insecure SSL
          </dt>
          <dd>
            <span
              className={
                insecureSslEnabled
                  ? 'px-2 inline-flex text-xs font-semibold leading-5 rounded-full bg-green-100 text-green-800'
                  : 'px-2 inline-flex text-xs font-semibold leading-5 rounded-full bg-red-100 text-red-800'
              }
            >
              {insecureSslEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
