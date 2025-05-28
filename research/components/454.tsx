import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Configuration object of the webhook
     *
     * @title Webhook Configuration
    */
    export interface webhook_config {
        url?: AutoViewInputSubTypes.webhook_config_url;
        content_type?: AutoViewInputSubTypes.webhook_config_content_type;
        secret?: AutoViewInputSubTypes.webhook_config_secret;
        insecure_ssl?: AutoViewInputSubTypes.webhook_config_insecure_ssl;
    }
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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived flags for SSL and secret presence
  const insecureSSLRaw =
    value.insecure_ssl !== undefined
      ? typeof value.insecure_ssl === "string"
        ? parseInt(value.insecure_ssl, 10)
        : value.insecure_ssl
      : 0;
  const isInsecure = insecureSSLRaw > 0;
  const isSecretConfigured = Boolean(value.secret);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <dl className="grid grid-cols-1 gap-y-4">
        {value.url && (
          <>
            <dt className="flex items-center text-sm font-medium text-gray-500 gap-1">
              <LucideReact.Link size={16} className="text-gray-400" />
              <span>URL</span>
            </dt>
            <dd className="mt-1 text-sm text-blue-600 truncate break-all">
              {value.url}
            </dd>
          </>
        )}
        {value.content_type && (
          <>
            <dt className="flex items-center text-sm font-medium text-gray-500 gap-1">
              <LucideReact.Tag size={16} className="text-gray-400" />
              <span>Content Type</span>
            </dt>
            <dd className="mt-1 text-sm text-gray-700">
              {value.content_type}
            </dd>
          </>
        )}
        <dt className="flex items-center text-sm font-medium text-gray-500 gap-1">
          <LucideReact.Lock size={16} className="text-gray-400" />
          <span>Secret</span>
        </dt>
        <dd className="mt-1 flex items-center text-sm text-gray-700">
          {isSecretConfigured ? (
            <>
              <LucideReact.CheckCircle
                size={16}
                className="text-green-500"
              />
              <span className="ml-1">Configured</span>
            </>
          ) : (
            <>
              <LucideReact.XCircle size={16} className="text-red-500" />
              <span className="ml-1">Not Configured</span>
            </>
          )}
        </dd>
        <dt className="flex items-center text-sm font-medium text-gray-500 gap-1">
          {isInsecure ? (
            <LucideReact.AlertTriangle
              size={16}
              className="text-yellow-500"
            />
          ) : (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          )}
          <span>SSL Verification</span>
        </dt>
        <dd className="mt-1 text-sm text-gray-700">
          {isInsecure ? "Insecure SSL allowed" : "SSL verification enforced"}
        </dd>
      </dl>
    </div>
  );
}
