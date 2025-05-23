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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { url, content_type, secret, insecure_ssl } = value;
  const displayContentType = content_type ?? 'form';
  // Treat any "1" or 1 as skip SSL verification; otherwise verification is enabled
  const verifySSL = insecure_ssl !== '1' && insecure_ssl !== 1;
  // Mask secret, preserving first 4 chars if available
  const maskedSecret = secret
    ? secret.length > 4
      ? `${secret.slice(0, 4)}${'*'.repeat(secret.length - 4)}`
      : '*'.repeat(secret.length)
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center mb-4">
        <LucideReact.Zap className="text-indigo-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">Webhook Configuration</h2>
      </div>
      <div className="space-y-3">
        {/* URL */}
        <div className="flex items-center text-gray-700">
          <LucideReact.Link className="text-gray-500 mr-2" size={16} />
          {url ? (
            <a
              href={url}
              className="text-indigo-600 hover:underline truncate"
              target="_blank"
              rel="noopener noreferrer"
            >
              {url}
            </a>
          ) : (
            <span className="italic text-gray-400">Not configured</span>
          )}
        </div>

        {/* Content Type */}
        <div className="flex items-center text-gray-700">
          <LucideReact.FileText className="text-gray-500 mr-2" size={16} />
          <span>
            Content Type:&nbsp;
            <span className="font-medium">{displayContentType}</span>
          </span>
        </div>

        {/* Secret */}
        <div className="flex items-center text-gray-700">
          <LucideReact.Key className="text-gray-500 mr-2" size={16} />
          <span>
            Secret:&nbsp;
            <span className="font-medium">
              {maskedSecret ?? <span className="italic text-gray-400">Not set</span>}
            </span>
          </span>
        </div>

        {/* SSL Verification */}
        <div className="flex items-center text-gray-700">
          {verifySSL ? (
            <LucideReact.CheckCircle className="text-green-500 mr-2" size={16} />
          ) : (
            <LucideReact.AlertTriangle className="text-red-500 mr-2" size={16} />
          )}
          <span>
            SSL Verification:&nbsp;
            <span className="font-medium">{verifySSL ? 'Enabled' : 'Disabled'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
